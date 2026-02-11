import type { Document } from 'mongoose';

export interface IAnswer {
  questionId: string;
  id: string;
  answer: string;
}

export interface IQuestionModel extends Document {
  id: string;
  question: string;
  answers: IAnswer[];
  correctAnswerId: string;
}

export interface IQuizQuery {
  id?: string;
}
