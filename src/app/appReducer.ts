import { combineReducers } from '@reduxjs/toolkit'

import messageReducer from '@/entities/message'
import baseApi from '@/shared/api/baseApi'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  message: messageReducer,
})
