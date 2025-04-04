import { iQuestionStatsForDoughnut } from '@/types/stats';
import { doughnutData } from '../types/CustomDoughnut';
import { BG_COLORS } from './getSegmentColor';

export const getDoughnutData = (
  questionsStats: iQuestionStatsForDoughnut | null,
): doughnutData => {
  const dataset = getDataEasyQuestionsDoughnut(questionsStats);
  console.log('getDoughnutData dataset        -', dataset.length);
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
  console.log(
    'getDoughnutData questionsStats -',
    Object.values(questionsStats).map((item) => item.correctAnswers).length,
  );
  return Object.values(questionsStats).map((item) => item.correctAnswers);
};
