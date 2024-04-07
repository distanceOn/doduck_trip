import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./appReducer";
import authApi from "../api/authApi";
import routesApi from "../api/routesApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, routesApi.middleware),
});
