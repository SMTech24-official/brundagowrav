import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRegisterState {
  user: {
    name: string;
    email: string;
    contactNumber: string;
    address?: string;
    profilePhoto?: string;
  };
  password: string;
  planId?: string;
}

const initialState: IRegisterState = {
  user: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    profilePhoto: "",
  },
  password: "",
  planId: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    setContactNumber: (state, action: PayloadAction<string>) => {
      state.user.contactNumber = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.user.address = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPlanId: (state, action: PayloadAction<string>) => {
      state.planId = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setContactNumber,
  setAddress,
  setPassword,
  setPlanId,
} = registerSlice.actions;
export default registerSlice.reducer;
