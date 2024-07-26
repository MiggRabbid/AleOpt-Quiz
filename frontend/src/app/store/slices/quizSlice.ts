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
    setCurrentResult: (state, action: PayloadAction<iUserAnswer[]>) => {
      console.log('setCurrentResult', action.payload.length);
      console.log('setCurrentResult', action.payload);
      return {
        ...state,
        questionIndex: action.payload.length,
        currentResult: action.payload,
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
    clearCurrentResult: (state) => {
      return {
        ...state,
        currentResult: [],
        questionIndex: 0,
      };
    },
  },
});

export const { actions } = quizSlice;

export default quizSlice.reducer;
