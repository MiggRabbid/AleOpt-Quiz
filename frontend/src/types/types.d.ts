import { iQuestion } from './quiz';
import { iUser } from './user';

// eslint-disable-next-line no-unused-vars
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

export interface IResponseError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}
