import { createSlice } from '@reduxjs/toolkit'

import type { AuthSliceState } from './types'

const initialState: AuthSliceState = {
  type: 'login',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeType: state => {
      state.type = state.type === 'login' ? 'register' : 'login'
    },
  },
})

export const { changeType } = authSlice.actions

export const authReducer = authSlice.reducer
