import {
  type IResultEntry,
  type IResultModel,
  type IUserAnswer,
  type IAverageAttempts,
  type IUserStats,
  type TypeAnswerId,
} from '../../modules/result/result.types';

export const getAverageResult = (attempts: IResultEntry[]): number => {
  if (attempts.length === 0) {
    return 0;
  }

  const currDivisor = attempts.length;

  const sumPercentage = attempts.reduce((acc, item: IResultEntry) => {
    const currPercentage = (item.correctAnswers / item.answers.length) * 100;
    return acc + currPercentage;
  }, 0);

  return Math.floor(sumPercentage / currDivisor);
};

export const getAverageAttempts = (attempts: IResultEntry[]): IAverageAttempts => {
  const averageAttempts = attempts.reduce((acc: IAverageAttempts, item: IResultEntry) => {
    item.answers.forEach((el: IUserAnswer) => {
      const questionKey = el.questionId;

      if (!acc[questionKey]) {
        acc[questionKey] = {
          question: el.question,
          result: 0,
          correctAnswerId: el.correctAnswerId as TypeAnswerId,
          countAnswers: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
          },
        };
      }

      acc[questionKey].result += el.result;
      acc[el.questionId].countAnswers[el.userAnswerId as TypeAnswerId] += 1;
    });

    return acc;
  }, {});

  return averageAttempts;
};

export const getUserStats = (userResults: IResultModel): IUserStats => {
  const { username, attempts } = userResults;

  return {
    username,
    attempts,
    numberAttempts: attempts.length,
    averageResult: getAverageResult(attempts),
    averageAttempts: getAverageAttempts(attempts),
  };
};
