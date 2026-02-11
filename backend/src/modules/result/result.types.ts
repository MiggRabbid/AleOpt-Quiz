import type { Document } from 'mongoose';

export interface IUserAnswer {
  question: string;
  questionId: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface IResultEntry {
  data: string;
  answers: IUserAnswer[];
  correctAnswers: number;
}

export interface IResultModel extends Document {
  username: string;
  attempts: IResultEntry[];
}

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
