import { Document } from 'mongoose';

export interface iUserAnswer {
  questionId: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iResultEntry {
  data: string;
  answers: iUserAnswer[];
  correctAnswers: number;
}

export interface iResultModel extends Document {
  username: string;
  attempts: iResultEntry[];
}

