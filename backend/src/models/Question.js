import { Schema, model } from 'mongoose';

const Answer = new Schema (
  {
    questionId: {type: String, required: true},
    id:{type: String, unique: true, required: true},
    answer:{type: String, required: true},
  }
)

const Question = new Schema (
  {
    id: {type: String, unique: true, required: true},
    question: {type: String, required: true},
    answers: [Answer],
    correctAnswerId: {type: String, required: true}
  }
)

export default model('Question', Question);