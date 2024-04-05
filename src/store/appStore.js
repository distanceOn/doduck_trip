import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./appReducer";

export const appStore = configureStore({
  reducer: rootReducer,
});
