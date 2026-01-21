import { Document } from 'mongoose';

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
