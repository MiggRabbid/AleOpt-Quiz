import { BG_COLORS } from './';

import type { iQuestionStatsForDoughnut, TDoughnutData } from '@app/types';

export const getDoughnutData = (
  questionsStats: iQuestionStatsForDoughnut | null,
): TDoughnutData => {
  const dataset = getDataEasyQuestionsDoughnut(questionsStats);
  return {
    labels: getLabelQuestionsDoughnut(questionsStats),
    datasets: [
      {
        data: dataset,
        backgroundColor: BG_COLORS,
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };
};

const getLabelQuestionsDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
): string[] => {
  if (!questionsStats) return [];
  return Object.values(questionsStats).map((item) => item.questionId);
};

const getDataEasyQuestionsDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
): number[] => {
  if (!questionsStats) return [];
  return Object.values(questionsStats).map((item) => item.correctAnswers);
};
