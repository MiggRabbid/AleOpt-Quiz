const API_PATH = '/api';

export const BASE_URL =
  typeof window === 'undefined'
    ? process.env.BASE_SERVER_URL
    : process.env.NEXT_PUBLIC_BASE_SERVER_URL;

export const requestsPath = {
  login: () => [API_PATH, 'auth', 'login'].join('/'),
  signup: () => [API_PATH, 'auth', 'signup'].join('/'),
  user: () => [API_PATH, 'data', 'user'].join('/'),
  users: () => [API_PATH, 'data', 'users'].join('/'),
  questions: () => [API_PATH, 'data', 'questions'].join('/'),
  question: () => [API_PATH, 'data', 'question'].join('/'),
  allStats: () => [API_PATH, 'data', 'results'].join('/'),
  userStats: () => [API_PATH, 'data', 'result'].join('/'),
};
