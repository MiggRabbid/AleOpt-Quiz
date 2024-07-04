/* eslint-disable import/no-cycle */
import { iQuestion, iUser } from './interfaces';

export type typeData = { [key: string]: string };

export type typeQuestionAnswer = {
  questionId: string;
  id: string;
  answer: string;
};

export type typeAuthState = {
  isAuthenticated: boolean;
  error: { name: string; message: string } | null;
};

export type typeApiResponse = {
  [key: string]: string;
};

export type typeModelData = null | string | iUser | iQuestion;
