import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./appReducer";
import authApi from "../api/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
