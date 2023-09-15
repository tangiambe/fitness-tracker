import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      id: "-1",
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
    },
    login: (state, action) => {
      const {_id, firstName, lastName, username, email, password} = action.payload;
      // console.log(`Action.payload: ${JSON.stringify(action.payload)}`)
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.username = username;
      state.email = email;
      state.password = password;
  },
  logout: (state) => {
      state._id = "-1";
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.email = "";
      state.password = "";
  }
    // login/logout reducers
  },
});
export const { info, login, logout } = userSlice.actions;
export default userSlice.reducer;
