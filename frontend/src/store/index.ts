import { combineReducers, configureStore } from '@reduxjs/toolkit';

import quiz, { actions as quizActions } from './slices/quiz';
import global, { actions as globalActions } from './slices/global';

const rootReducer = combineReducers({
  quiz,
  global,
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
