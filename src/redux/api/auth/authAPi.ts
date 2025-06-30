import {
  logOut,
  setUser,
  setUserToken,
} from "../../features/auth/userCredentialSlice";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user, password, planId, file }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ user, password, planId }));
        if (file) {
          formData.append("file", file);
        }
        return {
          url: "/user/create-user",
          method: "POST",
          body: formData,
        };
      },
    }),
    // loginUser: builder.mutation({
    //   query: (loginInfo) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: loginInfo,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    loginUser: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserToken(data.data.accessToken));
          dispatch(
            setUser({
              email: data.data.email,
              role: data.data.role,
              needPasswordChange: data.data.needPasswordChange,
            })
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["user"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    verifyEmail: builder.mutation({
      query: ({ id, token }) => ({
        url: `/auth/verify-email?id=${id}&token=${token}`,
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwordInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, id, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: { authorization: token },
        body: { id, password },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
