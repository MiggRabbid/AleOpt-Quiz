import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { typeModalState } from '../models/types';

type actionType = { modalType: string };

const initialState: typeModalState = {
  show: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<actionType>) => {
      return {
        ...state,
        show: true,
        modalType: action.payload.modalType,
      };
    },
    closeModal: (state) => {
      return {
        ...state,
        show: false,
        modalType: null,
      };
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
