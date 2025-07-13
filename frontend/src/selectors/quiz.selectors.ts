import { RootState } from '@/store';
import { iQuizState } from '@/types/quiz';

export const getQuizStateField =
  <K extends keyof iQuizState>(field: K) =>
  (state: RootState) =>
    state.quiz[field];
