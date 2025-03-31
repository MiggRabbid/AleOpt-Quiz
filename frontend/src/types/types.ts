/* eslint-disable import/no-cycle */
import { iQuestion } from './iQuiz';
import { iUser } from './iUser';

export type typeTranslationFunction = (key: string) => string;

export type typeData = { [key: string]: string };

export type typeModelData = null | string | iUser | iQuestion;

export type typeAnswersKeys = 'a' | 'b' | 'c' | 'd';

export type typeAnswers = Record<typeAnswersKeys, string>;

export type typeQuestionAnswer = {
  questionId: string;
  id: typeAnswersKeys;
  answer: string;
};

export type typeApiResponse = Record<string, string>;
