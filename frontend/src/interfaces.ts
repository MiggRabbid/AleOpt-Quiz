import { UserRole, questionAnswer, questionsType } from './types'

export interface iUser {
  role: UserRole;
  name: string
  username: string;
  password?: string,
  token: string;
}

export interface iUserAnswer {
  id: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iQuestion {
  id: number;
  question: string;
  answers: questionAnswer[];
  correctAnswerId: string;
}

export interface iAuthContextType {
  user: iUser | null;
  UseLogin: (data: iUser) => void;
  useLogout: () => void;
  getAuthHeader: () => any;
  isAdmin: (user: iUser) => boolean;
}


export interface iAuthState {
  isAuthenticated: boolean;
  error: { name: string, message: string } | null;
}

export interface iModalState { show: boolean; modalType: string | null }

export interface iQuizState {
  isStarted: boolean;
  questionIndex: number;
  questions: questionsType | {};
  currentResult: iUserAnswer[];
}