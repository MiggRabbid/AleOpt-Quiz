import { typeQuestionAnswer } from './types';

// eslint-disable-next-line no-shadow
export enum UserRoles {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
}

export interface iUser {
  _id?: string;
  role: UserRoles;
  name: string;
  username: string;
  password?: string;
  token?: string;
}

export interface iAuthContext {
  user: iUser | null;
  UseLogin: (data: iUser) => void;
  useLogout: () => void;
  getAuthHeader: () => unknown;
  isAdmin: (user: iUser) => boolean;
}

export interface iUserAnswer {
  id: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iQuestion {
  id: string;
  question: string;
  answers: typeQuestionAnswer[];
  correctAnswerId: string;
}

export interface iQuizState {
  isStarted: boolean;
  questionIndex: number;
  questions: iQuestion[] | Record<string, never>;
  currentResult: iUserAnswer[];
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}

export interface iResponseQuestions {
  status: string;
  data: iQuestion[];
}
