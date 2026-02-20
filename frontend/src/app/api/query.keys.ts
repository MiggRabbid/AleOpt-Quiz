interface IQueryKeys {
  users: {
    one: string;
    oneStats: string;
    all: string;
    allStats: string;
  };
  questions: {
    one: string;
    all: string;
    questionStats: string;
  };
  results: {
    one: string;
    all: string;
  };
}

export const queryKeys: IQueryKeys = {
  users: {
    one: 'oneUser',
    oneStats: 'oneStats',
    all: 'allUsers',
    allStats: 'allStats',
  },
  questions: {
    one: 'oneQuestion',
    all: 'allQuestions',
    questionStats: 'questionStats',
  },
  results: {
    one: 'oneResult',
    all: 'allResults',
  },
};
