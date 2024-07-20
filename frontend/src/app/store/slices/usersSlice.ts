import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iUser, iUsersState } from '../../../types/interfaces/iUser';

const initialState: iUsersState = {
  users: null,
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
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
