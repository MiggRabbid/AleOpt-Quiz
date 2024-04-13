import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './authSlice';
import quizReducer, { actions as quizActions } from './quizSlice';
import modalReducer, { actions as modalActions } from './modalSlice';

const rootReducer = combineReducers({
  authReducer,
  quizReducer,
  modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  ...authActions,
  ...quizActions,
  ...modalActions,
};

export { actions, rootReducer };