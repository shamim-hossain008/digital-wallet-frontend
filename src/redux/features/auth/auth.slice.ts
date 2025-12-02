/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/authSlice.ts
import { createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  // other non-sensitive fields...
}

interface AuthState {
  accessToken: string | null;
  refreshToken?: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken?: string | null;
        user: any;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      // sanitize user: remove password
      const { password, ...safeUser } = action.payload.user ?? {};
      state.user = safeUser;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
