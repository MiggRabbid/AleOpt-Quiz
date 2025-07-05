import { combineReducers, configureStore } from '@reduxjs/toolkit';

import quizReducer, { actions as quizActions } from './slices/quiz';
import globalReducer, { actions as globalActions } from './slices/global';

const rootReducer = combineReducers({
  quizReducer,
  globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  ...quizActions,
  ...globalActions,
};

const store = configureStore({
  reducer: rootReducer,
});

export { actions, rootReducer, store };

export type AppDispatch = typeof store.dispatch;
