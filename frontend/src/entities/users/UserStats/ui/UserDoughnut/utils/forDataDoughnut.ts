import {
  iQuestionStatsForDoughnut,
  typeStatFuncsArgs,
} from '../../../../../../types/iStats';
import { iResultEntry, iUserAnswer } from '../../../../../../types/iUser';

export const getDataAnswersForDoughnut = (userStats: typeStatFuncsArgs) => {
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
