/* eslint-disable no-unused-vars */
import type { iQuestion, iResultEntry, IUserRequest, typeAnswersKeys } from './';

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

export type TStatFuncsArgs = iUserStats | undefined;

export interface iQuestionStatsForDoughnut {
  [key: string]: {
    questionId: string;
    question: string;
    correctAnswers: number;
    incorrectAnswers: number;
    attemptCount: number;
  };
}

export interface IQuestionStatsForUser {
  username: IUserRequest['username'];
  firstName: IUserRequest['firstName'];
  lastName: IUserRequest['lastName'];
  numberAttempts: number;
  correctAnswers: number;
  averageResult: number;
}

export interface IQuestionStatsForAllUsers {
  questionId: iQuestion['id'];
  question: iQuestion['question'];
  results: IQuestionStatsForUser[];
}

export type IQuestionsStatsForAllUsers = Record<
  iQuestion['id'],
  IQuestionStatsForAllUsers
>;

export interface iStatsState {
  questionsStats: IQuestionsStatsForAllUsers;
}

export interface IPayloadSetStatsStateField<
  K extends keyof iStatsState,
  V extends iStatsState[K],
> {
  field: K;
  data: V;
}
