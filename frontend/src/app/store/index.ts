import { combineReducers, configureStore } from '@reduxjs/toolkit';

import quiz, { actions as quizActions } from './slices/quiz';
import global, { actions as globalActions } from './slices/global';
import stats, { actions as statsActions } from './slices/stats';

const rootReducer = combineReducers({
  quiz,
  global,
  stats,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  ...quizActions,
  ...globalActions,
  ...statsActions,
};

const store = configureStore({
  reducer: rootReducer,
});

export { actions, rootReducer, store };

export type AppDispatch = typeof store.dispatch;
