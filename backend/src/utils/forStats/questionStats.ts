import { IResultEntry, IResultModel, IUserAnswer, IQuestionStats } from '../../types';

export const getQuestionStats = (questionId: string, userStats: IResultModel[]): IQuestionStats => {
  const questionStats: IQuestionStats = {
    questionId,
    attempts: [],
    numberAttempts: 0,
    correctAnswers: 0,
    averageResult: 0,
  };

  userStats.forEach((stats: IResultModel) => {
    stats.attempts.forEach((attempt: IResultEntry) => {
      attempt.answers.forEach((answer: IUserAnswer) => {
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
