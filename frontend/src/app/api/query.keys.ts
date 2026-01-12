interface IQueryKeys {
  auth: {
    login: string;
  };
  users: {
    create: string;
    one: string;
    oneStats: string;
    all: string;
    allStats: string;
  };
  questions: {
    create: string;
    one: string;
    all: string;
  };
  results: {
    create: string;
    one: string;
    all: string;
  };
}

export const queryKeys: IQueryKeys = {
  auth: {
    login: 'login',
  },
  users: {
    create: 'create',
    one: 'one',
    oneStats: 'oneStats',
    all: 'all',
    allStats: 'allStats',
  },
  questions: {
    create: 'create',
    one: 'one',
    all: 'all',
  },
  results: {
    create: 'create',
    one: 'one',
    all: 'all',
  },
};
