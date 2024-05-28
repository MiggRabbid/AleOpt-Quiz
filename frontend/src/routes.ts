const API_PATH = '/api';

export default {
  MainPagePath: () => '/',
  loginPagePath: () => '/login',
  QuizPagePath: () => '/quiz',
  AdminPagePath: () => '/admin',
  notFoundPagePath: () => '/*',
  dataRequestPath: () => 'questions',
  loginRequestPath: () => [API_PATH, 'auth', 'login'].join('/'),
  signupRequestPath: () => [API_PATH, 'auth', 'signup'].join('/'),
  // dataRequestPath: (path: string) => [API_PATH, path].join('/'),
};
