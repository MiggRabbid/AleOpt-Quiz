export const BASE_URL = process.env.BASE_SERVER_URL;

export const API_PATH = {
  api: '/api',
  auth: 'auth',
  data: 'data',
};

export const API_PATH_TYPE = {
  login: 'login',
  signup: 'signup',
  user: 'user',
  users: 'users',
  question: 'question',
  questions: 'questions',
  result: 'result',
  results: 'results',
};

export const REQUEST_PATHS = {
  login: () => [API_PATH.api, API_PATH.auth, API_PATH_TYPE.login].join('/'),
  signup: () => [API_PATH.api, API_PATH.auth, API_PATH_TYPE.signup].join('/'),
  user: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.user].join('/'),
  users: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.users].join('/'),
  questions: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.questions].join('/'),
  question: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.question].join('/'),
  allStats: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.results].join('/'),
  userStats: () => [API_PATH.api, API_PATH.data, API_PATH_TYPE.result].join('/'),
} as const;

export type TRequestPath = ReturnType<(typeof REQUEST_PATHS)[keyof typeof REQUEST_PATHS]>;
