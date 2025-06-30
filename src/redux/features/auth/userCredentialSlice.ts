import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserCredentialState {
  user: {
    id?: string;
    email: string;
    role: string;
    needPasswordChange?: boolean;
  } | null;
  token: string | null;
}

const initialState: UserCredentialState = {
  user: null,
  token: null,
};

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserCredentialState["user"]>) => {
      state.user = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setUserToken, logOut } = userCredentialSlice.actions;
export default userCredentialSlice.reducer;

export const selectCurrentToken = (state: RootState) =>
  state.userCredentialInfo.token;
export const selectCurrentUser = (state: RootState) =>
  state.userCredentialInfo.user;
