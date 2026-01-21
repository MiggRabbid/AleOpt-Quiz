import { IResultEntry, IUserAnswer } from './resultTypes';

export type TypeAnswerId = 'a' | 'b' | 'c' | 'd';

export interface IAverageAttempts {
  [key: string]: {
    question: string;
    result: number;
    correctAnswerId: string;
    countAnswers: Record<TypeAnswerId, number>;
  };
}

export interface IUserStats {
  username: string;
  attempts: IResultEntry[];
  numberAttempts: number;
  averageResult: number;
  averageAttempts: IAverageAttempts;
}

export interface IQuestionStats {
  questionId: string;
  attempts: IUserAnswer[];
  numberAttempts: number;
  correctAnswers: number;
  averageResult: number;
}
