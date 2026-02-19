import {
  IResultEntry,
  IResultModel,
  IUserAnswer,
  IQuestionStats,
  IQuestionStatsForAllUsers,
  IQuestionsStatsForAllUsers,
  IQuestionStatsForUser,
  IUserModel,
} from '../../types';

export const getQuestionStats = (questionId: string, userStats: IResultModel[]): IQuestionStats => {
  const questionStats: IQuestionStats = {
    questionId,
    attempts: [],
    numberAttempts: 0,
    correctAnswers: 0,
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

  return questionStats;
};

export const getQuestionsStatsForAllUsers = (
  results: IResultModel[],
  users: IUserModel[],
): IQuestionsStatsForAllUsers => {
  const usersByUsername = new Map(
    users.map((user: IUserModel) => [
      user.username,
      {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    ]),
  );

  const questionsStatsMap: Record<
    string,
    {
      questionId: string;
      question: string;
      resultsByUser: Record<string, IQuestionStatsForUser>;
    }
  > = {};

  results.forEach((result: IResultModel) => {
    result.attempts.forEach((attempt: IResultEntry) => {
      attempt.answers.forEach((answer: IUserAnswer) => {
        if (!questionsStatsMap[answer.questionId]) {
          const allUsersStats = users.reduce<Record<string, IQuestionStatsForUser>>((acc, user) => {
            acc[user.username] = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              numberAttempts: 0,
              correctAnswers: 0,
            };
            return acc;
          }, {});

          questionsStatsMap[answer.questionId] = {
            questionId: answer.questionId,
            question: answer.question,
            resultsByUser: allUsersStats,
          };
        }

        if (!questionsStatsMap[answer.questionId].resultsByUser[result.username]) {
          const currUser = usersByUsername.get(result.username);

          questionsStatsMap[answer.questionId].resultsByUser[result.username] = {
            username: result.username,
            firstName: currUser?.firstName || '',
            lastName: currUser?.lastName || '',
            numberAttempts: 0,
            correctAnswers: 0,
          };
        }

        const currentUserStats =
          questionsStatsMap[answer.questionId].resultsByUser[result.username];

        currentUserStats.numberAttempts += 1;
        currentUserStats.correctAnswers += answer.result;
      });
    });
  });

  const questionsStatsForAllUsers = Object.values(questionsStatsMap).reduce<
    Record<string, IQuestionStatsForAllUsers>
  >((acc, questionStats) => {
    const normalizedResults = Object.values(questionStats.resultsByUser).map((userStats) => ({
      ...userStats,
      averageResult: userStats.numberAttempts
        ? Math.round(userStats.correctAnswers / userStats.numberAttempts)
        : 0,
    }));

    acc[questionStats.questionId] = {
      questionId: questionStats.questionId,
      question: questionStats.question,
      results: normalizedResults,
    };

    return acc;
  }, {});

  return questionsStatsForAllUsers as unknown as IQuestionsStatsForAllUsers;
};
