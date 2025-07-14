/* eslint-disable no-unused-vars */
import { iResultEntry } from './staff.types';
import { typeAnswersKeys } from './types.types';

export enum typeDoughnut {
  hard = 'hard',
  easy = 'easy',
}

export interface iAverageAttempts {
  [key: string]: {
    result: number;
    correctAnswerId: string;
    countAnswers: Record<typeAnswersKeys, number>;
  };
}

export interface iUserStats {
  username: string;
  attempts: iResultEntry[];
  numberAttempts: number;
  averageResult: number;
  averageAttempts: iAverageAttempts;
}

export type typeStatFuncsArgs = iUserStats | undefined;

export interface iQuestionStatsForDoughnut {
  [key: string]: {
    questionId: string;
    question: string;
    correctAnswers: number;
    incorrectAnswers: number;
    attemptCount: number;
  };
}
