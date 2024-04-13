import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface iModalState { show: boolean; modalType: string | null }

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