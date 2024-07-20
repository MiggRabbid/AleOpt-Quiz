import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FabricModalType, iModalSlice } from '../../../types/interfaces/iModal';
import { typeModelData } from '../../../types/types';

interface iPayloadAction {
  modalType: FabricModalType;
  modalData?: typeModelData;
}

const initialState: iModalSlice = {
  modalState: false,
  modalType: FabricModalType.defaultValue,
  modalData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<iPayloadAction>) => {
      return {
        ...state,
        modalState: true,
        modalType: action.payload.modalType,
        modalData: action.payload.modalData || null,
      };
    },
    closedModal: (state) => {
      return {
        ...state,
        modalState: false,
        modalType: FabricModalType.defaultValue,
        modalData: null,
      };
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
