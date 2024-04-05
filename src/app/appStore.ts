import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './appReducer'
import baseApi from '@/shared/api/baseApi'

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof appStore.getState>

export type AppDispatch = typeof appStore.dispatch
