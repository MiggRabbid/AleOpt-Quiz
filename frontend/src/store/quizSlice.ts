import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iQuizState, iQuestion, iAnswer } from '../interfaces';

const initialState: iQuizState = {
  isStarted: false,
  questionIndex: 0,
  questions: {},
  currentResult: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeQuizState: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },
    setQuestions: (state, action: PayloadAction<iQuestion[]>) => {
      state.questions = action.payload;
    },
    addAnswer: (state, action: PayloadAction<iAnswer>) => {
      state.currentResult.push(action.payload);
    },
    nextQuestion: (state) => {
      state.questionIndex = state.questionIndex + 1;
    }
  },
});

export const { actions } = quizSlice;

export default quizSlice.reducer;