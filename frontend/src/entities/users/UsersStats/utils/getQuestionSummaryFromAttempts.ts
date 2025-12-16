import type { iResultEntry } from '@app/types';

export interface QuestionSummary {
  question: string;
  countAnswers: number;
  totalAnswers: number;
}

export const getCorrectAnswersSummary = (
  attempts: iResultEntry[] | null,
): QuestionSummary[] | null => {
  const summaryMap: Record<string, QuestionSummary> = {};

  if (!attempts) return null;

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const { questionId, question, userAnswerId, correctAnswerId } = answer;

      if (!summaryMap[questionId]) {
        summaryMap[questionId] = {
          question,
          countAnswers: 0,
          totalAnswers: 0,
        };
      }

      summaryMap[questionId].totalAnswers += 1;

      if (userAnswerId === correctAnswerId) {
        summaryMap[questionId].countAnswers += 1;
      }
    }
  }

  const resultArray = Object.values(summaryMap).sort(
    (a, b) => b.countAnswers - a.countAnswers,
  );

  return resultArray.length > 3 ? resultArray.slice(0, 3) : resultArray;
};

export const getIncorrectAnswersSummary = (
  attempts: iResultEntry[] | null,
): QuestionSummary[] | null => {
  const summaryMap: Record<string, QuestionSummary> = {};

  if (!attempts) return null;

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const { questionId, question, userAnswerId, correctAnswerId } = answer;

      if (!summaryMap[questionId]) {
        summaryMap[questionId] = {
          question,
          countAnswers: 0,
          totalAnswers: 0,
        };
      }

      summaryMap[questionId].totalAnswers += 1;

      if (userAnswerId !== correctAnswerId) {
        summaryMap[questionId].countAnswers += 1;
      }
    }
  }

  const resultArray = Object.values(summaryMap).sort(
    (a, b) => b.countAnswers - a.countAnswers,
  );

  return resultArray.length > 3 ? resultArray.slice(0, 3) : resultArray;
};
