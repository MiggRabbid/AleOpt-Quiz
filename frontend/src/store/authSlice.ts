import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { typeAuthState } from '../models/types';

type actionTypeError = { name: string; message: string };

const initialState: typeAuthState = {
  isAuthenticated: false,
  error: null,
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
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
