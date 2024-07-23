import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iQuizState, iQuestion } from '../../../types/iQuiz';
import { iUserAnswer } from '../../../types/iUser';

const initialState: iQuizState = {
  isStarted: false,
  questionIndex: 0,
  questions: [],
  currentResult: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeQuizState: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isStarted: action.payload,
      };
    },
    setQuestions: (state, action: PayloadAction<iQuestion[]>) => {
      return {
        ...state,
        questions: action.payload,
      };
    },
    addAnswer: (state, action: PayloadAction<iUserAnswer>) => {
      return {
        ...state,
        currentResult: [...state.currentResult, action.payload],
      };
    },
    nextQuestion: (state) => {
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      };
    },
  },
});

export const { actions } = quizSlice;

export default quizSlice.reducer;
