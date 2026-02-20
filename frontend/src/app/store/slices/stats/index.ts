import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './index.config';

import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  IPayloadSetStatsStateField,
  iStatsState,
  IQuestionsStatsForAllUsers,
} from '@app/types';

const stats = createSlice({
  name: 'stats',
  initialState: structuredClone(initialState),
  reducers: {
    setStatsStateField: <K extends keyof iStatsState>(
      state: iStatsState,
      action: PayloadAction<IPayloadSetStatsStateField<K, iStatsState[K]>>,
    ) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    setQuestionsStats: (state, action: PayloadAction<IQuestionsStatsForAllUsers>) => {
      state.questionsStats = action.payload;
    },
    clearStatsState: () => {
      return structuredClone(initialState);
    },
  },
});

export const { actions } = stats;

export default stats.reducer;
