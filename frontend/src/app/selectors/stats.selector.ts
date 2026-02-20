import type { RootState } from '@app/store';
import type { iQuestion } from '@app/types';

export const getQuestionStatsById = (questionId: iQuestion['id']) => (state: RootState) =>
  state.stats.questionsStats[questionId] ?? null;
