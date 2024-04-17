import questions from './data/questions';
import users from './data/users';

import { dataType, responseLoginType, responseQuestionsType } from '../types';

const login = (data: dataType): responseLoginType => {
  const { username, password } = data as { username: string, password: string };
  const currentUser = users[username];

  if (!!currentUser && currentUser.password === password) {
    return {
      status: '200',
      data: {
        name: currentUser.name,
        username: currentUser.username,
        token: currentUser.token,
        role: currentUser.role,
      },
    }
  }

  return {
    status: '401',
    data: {error: 'Неизвестный пользователь'},
  }
};

const getQuestions = (): responseQuestionsType => {
  return {
    status: '200',
    data: questions,
  }
};

const fakeApi = (path: string, data?: dataType): responseLoginType | responseQuestionsType => {
  switch (path) {
    case 'login':
      return login(data!);
    case 'questions':
      return getQuestions();
    default:
      return {
        status: '400',
        data: {error: 'Неизвестный запрос'},
      };
  }
};

export default fakeApi;