import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'employee';

export interface iUser {
  role: UserRole;
  name: string
  username: string;
  token: string;
}

export interface iAuthState {
  user: iUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

type actionType = { error: string | null};

const initialState: iAuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<actionType>) => {
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;