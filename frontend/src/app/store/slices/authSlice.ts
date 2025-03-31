import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iUser } from '../../../types/iUser';

type actionTypeError = { name: string; message: string };

export type typeAuthState = {
  isAuthenticated: boolean;
  error: { name: string; message: string } | null;
  currentUser: iUser | null;
};

const initialState: typeAuthState = {
  isAuthenticated: false,
  error: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    },
    loginFailed: (state, action: PayloadAction<actionTypeError>) => {
      return {
        ...state,
        isAuthenticated: true,
        error: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    },
    setCurrentUser: (state, action: PayloadAction<iUser>) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
