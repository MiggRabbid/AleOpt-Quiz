import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './authSlice';
import quizReducer, { actions as quizActions } from './quizSlice';
import modalReducer, { actions as modalActions } from './modalSlice';
import quizApi from './quizApi';

const rootReducer = combineReducers({
  [quizApi.reducerPath]: quizApi.reducer,
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

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

export { actions, rootReducer, store };
export type AppDispatch = typeof store.dispatch;
