import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iUser, iUsersState } from '../../../types/iUser';

const initialState: iUsersState = {
  users: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<iUser[]>) => {
      return {
        ...state,
        users: action.payload,
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

export const { actions } = userSlice;

export default userSlice.reducer;
