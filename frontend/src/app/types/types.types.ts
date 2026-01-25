import type { iQuestion } from './quiz.types';
import type { iUser } from './staff.types';
import type { UseNavigateResult } from '@tanstack/react-router';

// eslint-disable-next-line no-unused-vars
export type typeTranslationFunction = (key: string) => string;

export type typeData = { [key: string]: string };

export type typeModelData = null | string | iUser | iQuestion;

export const answersKeys = ['a', 'b', 'c', 'd'] as const;

export type typeAnswersKeys = 'a' | 'b' | 'c' | 'd';

export type typeAnswers = Record<typeAnswersKeys, string>;

export type typeQuestionAnswer = {
  questionId: string;
  id: typeAnswersKeys;
  answer: string;
};

export type typeApiResponse = Record<string, string>;

export interface iHandledError {
  status: number;
  message: string;
  errorType: string;
}
