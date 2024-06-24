import { RootState } from '../store/index';

export const getNewUserModalState = (state: RootState) =>
  state.modalReducer.showNewUserModal;

export const getNewQuestionModalModalState = (state: RootState) =>
  state.modalReducer.showNewQuestionModal;
