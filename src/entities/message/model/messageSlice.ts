import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type MessageInitialState = {
  text: null | string | string[]
  messageType: 'success' | 'warning' | null
}
const initialState: MessageInitialState = {
  text: null,
  messageType: null,
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, { payload }: PayloadAction<MessageInitialState>) => {
      state.text = payload.text
      state.messageType = payload.messageType
    },
    resetMessageText: () => initialState,
  },
})

export const { setMessage, resetMessageText } = messageSlice.actions

export const messageReducer = messageSlice.reducer
