import { iResultEntry, iResultModel, iUserAnswer } from '../../types/resultTypes';
import { iQuestionStats } from '../../types/statsTypes';

export const getQuestionStats = (questionId: string, userStats: iResultModel[]): iQuestionStats => {
  const questionStats: iQuestionStats = {
    questionId,
    attempts: [],
    numberAttempts: 0,
    correctAnswers: 0,
    averageResult: 0,
  };

  userStats.forEach((stats: iResultModel) => {
    stats.attempts.forEach((attempt: iResultEntry) => {
      attempt.answers.forEach((answer: iUserAnswer) => {
        if (answer.questionId === questionId) {
          questionStats.attempts.push(answer);
          questionStats.numberAttempts += 1;
          questionStats.correctAnswers += answer.result;
        }
      });
    });
  });

  questionStats.averageResult += Math.round(
    questionStats.correctAnswers / questionStats.numberAttempts,
  );

  return questionStats;
};

export const getStringQuestionStats = (data: string) => console.log(data);
