/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  logOut,
  setUser,
  setUserToken,
} from "../features/auth/userCredentialSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://172.252.13.71:5002/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userCredentialInfo.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    try {
      // const res = await fetch(`http://localhost:5000/api/auth/refresh-token`, {
      const res = await fetch(
        `http://172.252.13.71:5002/api/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.data?.accessToken) {
        api.dispatch(setUserToken(data.data.accessToken));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } catch (error) {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user"],
  endpoints: () => ({}),
});
