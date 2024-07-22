import {  Document } from 'mongoose';

export interface iAnswer {
  questionId: string;
  id: string;
  answer: string;
}

export interface iQuestionModel extends Document {
  id: string;
  question: string;
  answers: iAnswer[];
  correctAnswerId: string;
}