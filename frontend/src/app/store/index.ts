import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer, { actions as authActions } from './slices/authSlice';
import quizReducer, { actions as quizActions } from './slices/quizSlice';
import usersReducer, { actions as usersActions } from './slices/usersSlice';
import modalReducer, { actions as modalActions } from './slices/modalSlice';

import quizApi from './api/quiz.api';
import authApi from './api/auth.api';
import usersApi from './api/users.api';
import statsApi from './api/stats.api';

const rootReducer = combineReducers({
  [quizApi.reducerPath]: quizApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer,
  authReducer,
  quizReducer,
  usersReducer,
  modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  ...authActions,
  ...quizActions,
  ...usersActions,
  ...modalActions,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(quizApi.middleware)
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(statsApi.middleware),
});

export { actions, rootReducer, store };

export type AppDispatch = typeof store.dispatch;
