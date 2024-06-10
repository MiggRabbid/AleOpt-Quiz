// backend/src/models/Question.ts
import { Schema, model, Document } from 'mongoose';

interface iAnswer {
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

const AnswerSchema = new Schema<iAnswer>({
  questionId: { type: String, required: true },
  id: { type: String, unique: true, required: true },
  answer: { type: String, required: true },
});

const QuestionSchema = new Schema<iQuestionModel>({
  id: { type: String, unique: true, required: true },
  question: { type: String, required: true },
  answers: [AnswerSchema],
  correctAnswerId: { type: String, required: true },
});

const Question = model<iQuestionModel>('Question', QuestionSchema);

export default Question;
