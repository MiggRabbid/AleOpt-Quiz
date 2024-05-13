import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iAuthState } from '../interfaces';

type actionTypeError = { name: string, message: string } ;

const initialState: iAuthState = {
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
    loginFailed: (state, action: PayloadAction<actionTypeError>) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;