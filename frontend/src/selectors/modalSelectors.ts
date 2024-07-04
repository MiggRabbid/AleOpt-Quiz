import { RootState } from '../store/index';

export const getModalType = (state: RootState) => state.modalReducer.modalType;

export const getModalState = (state: RootState) =>
  state.modalReducer.modalState;
