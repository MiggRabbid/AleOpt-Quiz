import { createSlice } from '@reduxjs/toolkit';

import { typeModalState } from '../models/types';

const initialState: typeModalState = {
  showNewUserModal: false,
  showNewQuestionModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeNewUserModalState: (state) => {
      return {
        ...state,
        showNewUserModal: !state.showNewUserModal,
      };
    },
    changeNewQuestionModalState: (state) => {
      return {
        ...state,
        showNewQuestionModal: !state.showNewQuestionModal,
      };
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
