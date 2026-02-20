import type {
  iQuestion,
  IQuestionsStatsForAllUsers,
  IQuestionStatsForAllUsers,
} from '@/app/types';

export const getCurrQuestionStats = (
  questionId: iQuestion['id'],
  questionsStats: IQuestionsStatsForAllUsers,
): IQuestionStatsForAllUsers | null => {
  return questionsStats[questionId] ?? null;
};
