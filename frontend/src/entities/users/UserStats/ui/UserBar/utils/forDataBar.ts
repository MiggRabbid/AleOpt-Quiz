import { typeStatFuncsArgs } from '../../../../../../types/iStats';

export const getDataCorrectAnswersCounts = (userStats: typeStatFuncsArgs) => {
  if (!userStats) return [];
  return userStats.attempts.map((item) => item.correctAnswers);
};

export const getDataIncorrectAnswersCounts = (userStats: typeStatFuncsArgs) => {
  if (!userStats) return [];
  return userStats.attempts.map(
    (item) => item.answers.length - item.correctAnswers,
  );
};

export const getMaxYScale = (userStats: typeStatFuncsArgs) => {
  if (!userStats) return 50;
  return userStats.attempts.reduce(
    (max, current) =>
      current.answers.length > max ? current.answers.length : max,
    0,
  );
};
