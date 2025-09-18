import { iQuestionStatsForDoughnut, typeStatFuncsArgs } from '@/types/stats.types';
import { barData } from '../types/CustomBar';
import { iResultEntry, iUserAnswer } from '@/types/staff.types';

export const getBarData = (props: {
  labelLineOne: string;
  dataLineOne: number[];
  labelLineTwo: string;
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}): barData => {
  const { xLabels, labelLineOne, dataLineOne, labelLineTwo, dataLineTwo } = props;

  return {
    labels: xLabels,
    datasets: [
      {
        label: labelLineOne,
        data: dataLineOne,
        backgroundColor: 'oklch(84.5% 0.143 164.978)',
        hoverBackgroundColor: 'oklch(84.5% 0.143 164.978)',
        borderColor: 'oklch(84.5% 0.143 164.978)',
      },
      {
        label: labelLineTwo,
        data: dataLineTwo,
        backgroundColor: 'oklch(71.2% 0.194 13.428)',
        hoverBackgroundColor: 'oklch(71.2% 0.194 13.428)',
        borderColor: 'oklch(71.2% 0.194 13.428)',
      },
    ],
  };
};

export const getDataAnswersForDoughnut = (userStats: typeStatFuncsArgs | null) => {
  if (!userStats) return null;

  const questionsStats = userStats.attempts.reduce(
    (acc, attempt: iResultEntry): iQuestionStatsForDoughnut => {
      attempt.answers.forEach((question: iUserAnswer) => {
        const key = question.questionId;

        if (!acc[key]) {
          acc[key] = {
            questionId: '',
            question: '',
            correctAnswers: 0,
            incorrectAnswers: 0,
            attemptCount: 0,
          };
        }
        acc[key].question = question.question;
        acc[key].questionId = question.questionId;
        acc[key].correctAnswers += question.result;
        if (question.result === 0) {
          acc[key].incorrectAnswers += 1;
        }
        acc[key].attemptCount += 1;
      });

      return acc;
    },
    {} as iQuestionStatsForDoughnut,
  );
  return questionsStats;
};

export const getLabelQuestionsDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
): string[] => {
  if (!questionsStats) return [];
  return Object.values(questionsStats).map((item) => item.questionId);
};

export const getDataEasyQuestionsDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
): number[] => {
  if (!questionsStats) return [];
  return Object.values(questionsStats).map((item) => item.correctAnswers);
};

export const getDataHardQuestionsDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
): number[] => {
  if (!questionsStats) return [];
  return Object.values(questionsStats).map((item) => item.incorrectAnswers);
};
