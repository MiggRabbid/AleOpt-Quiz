import { Schema, model } from 'mongoose';
import type { IResultModel } from '../types';

const UserAnswerSchema = new Schema(
  {
    question: { type: String, required: true },
    questionId: { type: String, required: true },
    userAnswerId: { type: String, required: true },
    correctAnswerId: { type: String, required: true },
    result: { type: Number, required: true },
  },
  { _id: false },
);

const ResultEntrySchema = new Schema(
  {
    data: { type: String, required: true },
    answers: { type: [UserAnswerSchema], required: true },
    correctAnswers: { type: Number, required: true },
  },
  { _id: false },
);

const ResultSchema = new Schema<IResultModel>({
  username: { type: String, unique: true, required: true },
  attempts: { type: [ResultEntrySchema], unique: false, required: true },
});

const Results = model<IResultModel>('Results', ResultSchema);

export default Results;
