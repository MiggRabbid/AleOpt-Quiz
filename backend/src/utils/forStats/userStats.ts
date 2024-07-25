import { iResultEntry, iResultModel, iUserAnswer } from '../../types/resultTypes';
import { iAverageAttempts, iUserStats, typeAnswerId } from '../../types/statsTypes';

const getAverageResult = (attempts: iResultEntry[]): number => {
  const currDivisor = (attempts.length)

  const sumPercentage = attempts.reduce((acc, item: iResultEntry) => {
    const currPercentage = (item.correctAnswers / item.answers.length * 100);
    acc = acc +  currPercentage;
    return acc
  }, 0);

  return Math.floor(sumPercentage / currDivisor);
}

const getAverageAttempts = (attempts: iResultEntry[]): iAverageAttempts => {
  const averageAttempts = attempts.reduce((acc: iAverageAttempts, item: iResultEntry) => {
    item.answers.forEach((el: iUserAnswer) => {
      const questionKey = el.questionId;

      if (!acc[questionKey]) {
        acc[questionKey] = {
          question: el.question,
          result: 0,
          correctAnswerId: el.correctAnswerId as typeAnswerId,
          countAnswers: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
          },
        };
      }

      acc[questionKey].result += el.result;
      acc[el.questionId].countAnswers[el.userAnswerId as typeAnswerId] += 1;
    });

    return acc;
  }, {});

  return averageAttempts;
}

export const getUserStats = (userResults: iResultModel): iUserStats => {
  const { username, attempts } = userResults
  return {
    username,
    attempts,
    numberAttempts: attempts.length,
    averageResult: getAverageResult(attempts),
    averageAttempts: getAverageAttempts(attempts),
  };
}