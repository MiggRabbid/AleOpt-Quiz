import { iResultEntry, iUserAnswer } from './resultTypes';

export type typeAnswerId = 'a' | 'b' | 'c' | 'd';

export interface iAverageAttempts {
  [key: string]: {
    question: string;
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

export interface iQuestionStats {
  questionId: string;
  attempts: iUserAnswer[];
  numberAttempts: number;
  correctAnswers: number;
  averageResult: number;
}
