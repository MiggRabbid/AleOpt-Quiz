import { iResultEntry } from './resultTypes';

export type typeAnswerId = 'a' | 'b' | 'c' | 'd';

export interface iAverageAttempts {
  [key: string]: {
    result: number;
    correctAnswerId: string;
    countAnswers: Record<typeAnswerId, number>;
  },
}

export interface iUserStats {
  username: string;
  attempts: iResultEntry[];
  numberAttempts: number;
  averageResult: number;
  averageAttempts: iAverageAttempts;
}