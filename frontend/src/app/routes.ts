const API_PATH = '/api';

export const BASE_SERVER_URL = 'http://localhost:5000/';

export default {
  MainPagePath: () => '/',
  loginPagePath: () => '/login',
  QuizPagePath: () => '/quiz',
  AdminPagePath: () => '/admin',
  notFoundPagePath: () => '/*',

  loginRequestPath: () => [API_PATH, 'auth', 'login'].join('/'),
  signupRequestPath: () => [API_PATH, 'auth', 'signup'].join('/'),

  usersRequestPath: () => [API_PATH, 'data', 'users'].join('/'),

  questionsRequestPath: () => [API_PATH, 'data', 'questions'].join('/'),

  allStatsRequestPath: () => [API_PATH, 'data', 'results'].join('/'),
  userStatsRequestPath: () => [API_PATH, 'data', 'result'].join('/'),
};
