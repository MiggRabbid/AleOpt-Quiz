import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from '../data/questions'

interface iQuestion {
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string[];
}

interface iAnswer {
  id: string;
  currentAnswer: string[];
  correctAnswer: string[];
}

interface QuizState {
  questions: iQuestion[];
  currentResult: iAnswer[];
}

const initialState: QuizState = {
  questions: data,
  currentResult: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<iQuestion[]>) => {
      state.questions = action.payload;
    },
    addAnswer: (state, action: PayloadAction<iAnswer>) => {
      state.currentResult.push(action.payload);
    },
  },
});

export const { actions } = quizSlice;

export default quizSlice.reducer;