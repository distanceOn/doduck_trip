import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import authApi from "../api/authApi";

export const rootReducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
});
