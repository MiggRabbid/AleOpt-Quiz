const API_PATH = '/api';

// export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const requestsPath = {
  login: () => [API_PATH, 'auth', 'login'].join('/'),
  signup: () => [API_PATH, 'auth', 'signup'].join('/'),

  curUser: () => [API_PATH, 'data', 'user'].join('/'),
  users: () => [API_PATH, 'data', 'users'].join('/'),

  questions: () => [API_PATH, 'data', 'questions'].join('/'),

  allStats: () => [API_PATH, 'data', 'results'].join('/'),
  userStats: () => [API_PATH, 'data', 'result'].join('/'),
};
