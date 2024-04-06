import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // данные пользователя из action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // очистить данные пользователя
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
