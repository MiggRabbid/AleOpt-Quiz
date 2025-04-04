import { combineReducers, configureStore } from '@reduxjs/toolkit';

import quizReducer, { actions as quizActions } from './slices/quiz/index';
// import usersReducer, { actions as usersActions } from './slices/usersSlice';
// import modalReducer, { actions as modalActions } from './slices/modalSlice';

const rootReducer = combineReducers({
  quizReducer,
  // usersReducer,
  // modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  ...quizActions,
  // ...usersActions,
  // ...modalActions,
};

const store = configureStore({
  reducer: rootReducer,
});

export { actions, rootReducer, store };

export type AppDispatch = typeof store.dispatch;
