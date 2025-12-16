interface IQueryKeys {
  auth: {
    login: string;
  };
  users: {
    create: string;
    one: string;
    stats: string;
    all: string;
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
    stats: 'stats',
    all: 'all',
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
