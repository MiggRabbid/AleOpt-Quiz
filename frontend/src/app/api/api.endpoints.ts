export const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const API_PATH = {
  api: '/api',
  auth: 'auth',
  data: 'data',
};

export const API_PATH_TYPE = {
  login: 'login',
  checkToken: 'check-token',
  signup: 'signup',
  user: 'user',
  users: 'users',
  question: 'question',
  questions: 'questions',
  questionsStats: 'questions-stats',
  result: 'result',
  results: 'results',
};

export const REQUEST_PATHS = {
  login: () => [API_PATH.api, API_PATH.auth, API_PATH_TYPE.login].join('/'),
  checkToken: () => [API_PATH.api, API_PATH.auth, API_PATH_TYPE.checkToken].join('/'),
  signup: () => [API_PATH.api, API_PATH.auth, API_PATH_TYPE.signup].join('/'),
  user: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.user].join('/'),
  users: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.users].join('/'),
  allUserStats: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.results].join('/'),
  oneUserStats: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.result].join('/'),
  questions: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.questions].join('/'),
  question: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.question].join('/'),
  questionsStats: () =>
    [API_PATH.api, API_PATH.data, API_PATH_TYPE.questionsStats].join('/'),
} as const;

export type TRequestPath = ReturnType<(typeof REQUEST_PATHS)[keyof typeof REQUEST_PATHS]>;
