export interface IErrorPreset {
  statusCode: number;
  message: string;
  errorType: string;
}

export const ERROR_PRESETS = {
  authUnauthorized: {
    statusCode: 403,
    message: 'Пользователь не авторизован',
    errorType: 'authError',
  },
  authTokenExpired: {
    statusCode: 401,
    message: 'Пользователь не авторизован',
    errorType: 'tokenExpired',
  },
  accessDenied: {
    statusCode: 403,
    message: 'У вас нет доступа',
    errorType: 'isNotAdmin',
  },
  internalServerError: {
    statusCode: 500,
    message: 'Внутренняя ошибка сервера',
    errorType: 'internalServerError',
  },
  validationError: {
    statusCode: 400,
    message: 'Ошибка валидации',
    errorType: 'validationError',
  },
  userNotFound: {
    statusCode: 404,
    message: 'Пользователь не найден',
    errorType: 'userNotFound',
  },
  userNotFoundGeneric: {
    statusCode: 404,
    message: 'Пользователь не найден',
    errorType: 'notFound',
  },
  userAlreadyExists: {
    statusCode: 400,
    message: 'Пользователь с таким именем уже существует',
    errorType: 'userExists',
  },
  userInactive: {
    statusCode: 401,
    message: 'Доступ запрещен для неактивного пользователя',
    errorType: 'userInactive',
  },
  incorrectPassword: {
    statusCode: 401,
    message: 'Неправильный пароль',
    errorType: 'incorrectPassword',
  },
  resultNotFound: {
    statusCode: 404,
    message: 'Результат не найден',
    errorType: 'notFound',
  },
  questionNotFoundBadRequest: {
    statusCode: 400,
    message: 'Вопрос не найден',
    errorType: 'notFound',
  },
  questionNotFound: {
    statusCode: 404,
    message: 'Вопрос не найден',
    errorType: 'notFound',
  },
  questionAlreadyExists: {
    statusCode: 400,
    message: 'Такой вопрос уже существует',
    errorType: 'questionExists',
  },
} as const satisfies Record<string, IErrorPreset>;

export const toErrorResponse = (preset: IErrorPreset) => ({
  message: preset.message,
  errorType: preset.errorType,
});
