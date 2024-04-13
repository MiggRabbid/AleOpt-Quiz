import { RootState } from '../store/index';

export const getModalState = (state: RootState) => state.modalReducer.show;

export const getModalType = (state: RootState) => state.modalReducer.modalType;
