import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import authApi from "../api/authApi";
import routesApi from "../api/routesApi";

export const rootReducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [routesApi.reducerPath]: routesApi.reducer,
});
