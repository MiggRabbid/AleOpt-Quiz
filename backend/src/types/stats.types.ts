import { IQuestionModel } from './quiz.types';
import { IResultEntry, IUserAnswer } from './result.types';
import { IResponseUser } from './user.types';

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
}

export interface IQuestionStatsForUser {
  username: IResponseUser['username'];
  firstName: IResponseUser['firstName'];
  lastName: IResponseUser['lastName'];
  numberAttempts: IQuestionStats['numberAttempts'];
  correctAnswers: IQuestionStats['correctAnswers'];
}

export interface IQuestionStatsForAllUsers {
  questionId: IQuestionModel['id'];
  question: IQuestionModel['question'];
  results: IQuestionStatsForUser[];
}

export type IQuestionsStatsForAllUsers = Record<IQuestionModel['id'], IQuestionStatsForAllUsers>;
