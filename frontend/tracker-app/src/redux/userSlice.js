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
      sex: "",
      age: "",
      height: "",
      weight: "",
      timezone: "",
      level:"",
      goal:"",
      // nextPermutation: false,
      nextClick: false
    },
  },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
    login: (state, action) => {
      const {_id, firstName, lastName, username, email, password, sex, height, weight, timezone, level, goal} = action.payload;
      // console.log(`Action.payload: ${JSON.stringify(action.payload)}`)
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.username = username;
      state.email = email;
      state.password = password;
      state.sex = sex;
      state.height = height;
      state.weight = weight;
      state.timezone = timezone;
      state.level = level;
      state.goal = goal;
  },
  logout: (state) => {
      state._id = "-1";
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.email = "";
      state.password = "";
      state.sex = "";
      state.height = "";
      state.weight = "";
      state.timezone = "";
      state.level = "";
      state.goal = "";
      state.nextClick = false;
  }
  },
});
export const { info, login, logout } = userSlice.actions;
export default userSlice.reducer;
