import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
