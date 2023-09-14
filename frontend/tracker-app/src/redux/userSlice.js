import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      fname: "",
      lname:"",
      username:"",
      email: "",
      password: "",
      // confirmPw: "",
      nextPermation: false,
      nextClick: false,
      plan:"",
      plantime:"",
      totalToPay:0,
    },
  },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    }
    // login/logout reducers
  },
});
export const { info } = userSlice.actions;
export default userSlice.reducer;
