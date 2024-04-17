// const API_PATH = '/api/v1';

export default {
  MainPagePath: () => '/',
  loginPagePath: () => '/login',
  QuizPagePath: () => '/quiz',
  AdminPagePath: () => '/admin',
  notFoundPagePath: () => '/*',
  loginRequestPath: () => 'login',
  dataRequestPath: () => 'questions',
  // loginRequestPath: () => [API_PATH, 'login'].join('/'),
  // signupRequestPath: () => [API_PATH, 'signup'].join('/'),
  // dataRequestPath: (path: string) => [API_PATH, path].join('/'),
};