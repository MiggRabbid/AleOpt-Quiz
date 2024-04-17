import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iModalState } from '../interfaces';

type actionType = { modalType: string }

const initialState: iModalState = {
  show: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<actionType>) => {
      state.show = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.show = false;
      state.modalType = null;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;