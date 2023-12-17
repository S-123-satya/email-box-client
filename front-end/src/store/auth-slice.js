import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginMode: true,
  isLogin: false,
  email: null,
  token: null,
  userId: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLogin = !!action.payload.token;
    },
    logout(state) {
      localStorage.clear();
      state.email = null;
      state.token = null;
      state.userId = null;
      state.isLogin = false;
    },
    toggleLoginMode(state){
        state.isLoginMode=!state.isLoginMode;
    }
  },
});

export default authSlice;