/* eslint-disable import/no-cycle */
import { iQuestion } from './interfaces/iQuiz';
import { iUser } from './interfaces/iUser';

export type typeData = { [key: string]: string };

export type typeModelData = null | string | iUser | iQuestion;

export type typeAnswersKeys = 'a' | 'b' | 'c' | 'd';

export type typeAnswers = Record<typeAnswersKeys, string>;

export type typeQuestionAnswer = {
  questionId: string;
  id: typeAnswersKeys;
  answer: string;
};

export type typeAuthState = {
  isAuthenticated: boolean;
  error: { name: string; message: string } | null;
};

export type typeApiResponse = {
  [key: string]: string;
};
