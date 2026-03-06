import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLogin: localStorage.getItem("isLogin") ? true : false,
  },
  reducers: {
    isLogin: (state) => {
      state.isLogin = true;
      window.localStorage.setItem("isLogin", true);
    },
    logout: (state) => {
      state.isLogin = false;
      window.localStorage.removeItem("isLogin");
    },
  },
});

export const { isLogin, logout } = authSlice.actions;
export default authSlice.reducer;
