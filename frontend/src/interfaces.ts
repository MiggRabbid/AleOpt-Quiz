import { UserRole, questionsType } from './types'

export interface iUser {
  role: UserRole;
  name: string
  username: string;
  password?: string,
  token: string;
}

export interface iAnswer {
  id: string;
  userAnswer: string;
  correctAnswer: string;
  result: number;
}

export interface iQuestion {
  id: number;
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string;
}

export interface iAuthContextType {
  user: iUser | null;
  logIn: (data: iUser) => void;
  logOut: () => void;
  getAuthHeader: () => any;
  isAdmin: (user: iUser) => boolean;
}


export interface iAuthState {
  user: iUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface iModalState { show: boolean; modalType: string | null }

export interface iQuizState {
  isStarted: boolean;
  questionIndex: number;
  questions: questionsType | {};
  currentResult: iAnswer[];
}