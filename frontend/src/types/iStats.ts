import { iResultEntry } from './iUser';

export type typeAnswerId = 'a' | 'b' | 'c' | 'd';

// eslint-disable-next-line no-shadow
export enum typeDoughnut {
  hard = 'hard',
  easy = 'easy',
}

export interface iAverageAttempts {
  [key: string]: {
    result: number;
    correctAnswerId: string;
    countAnswers: Record<typeAnswerId, number>;
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
