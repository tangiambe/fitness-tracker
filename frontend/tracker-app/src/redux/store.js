import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './userSlice'
import userReducer from './userSlice'
import pageReducer from './page'

export const store=configureStore({
    reducer:{
      page:pageReducer,
      user:userReducer,
    },
  })