// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isSignedIn: false, // Change this to true once the user signs in
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    signIn: (state) => {
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
});

export default authSlice;

export const authAction = authSlice.actions;
