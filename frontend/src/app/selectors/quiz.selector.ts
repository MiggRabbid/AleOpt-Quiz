import type { RootState } from '@app/store';
import type { iQuizState } from '@app/types';

export const getQuizStateField =
  <K extends keyof iQuizState>(field: K) =>
  (state: RootState) =>
    state.quiz[field];
