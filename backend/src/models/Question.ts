// backend/src/models/Question.ts
import { Schema, model } from 'mongoose';

import type { IAnswer, IQuestionModel } from '../types';

const AnswerSchema = new Schema<IAnswer>({
  questionId: { type: String, required: true },
  id: { type: String, required: true },
  answer: { type: String, required: true },
});

const QuestionSchema = new Schema<IQuestionModel>({
  id: { type: String, unique: true, required: true },
  question: { type: String, required: true },
  answers: [AnswerSchema],
  correctAnswerId: { type: String, required: true },
});

const Question = model<IQuestionModel>('Question', QuestionSchema);

export default Question;
