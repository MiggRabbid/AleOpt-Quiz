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
  } else {
    const authError = new Error()
    authError.name = '401';
    authError.message = 'Неизвестный пользователь';
    throw authError;
  }
};

const getQuestions = (): responseQuestionsType => {
  console.log('getQuestions - questions', questions)
  return {
    status: '200',
    data: questions,
  }
};

const fakeApi = (path: string, data?: dataType): responseLoginType | responseQuestionsType | Error => {
  switch (path) {
    case 'login':
      return login(data!);
    case 'questions':
      return getQuestions();
    default:
      const unknownError = new Error()
      unknownError.name = '400';
      unknownError.message = 'Неизвестный запрос';
      throw unknownError;
  }
};

export default fakeApi;