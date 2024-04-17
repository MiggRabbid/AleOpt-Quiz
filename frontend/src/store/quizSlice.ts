import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iQuizState, iQuestions, iAnswer } from '../interfaces';

const initialState: iQuizState = {
  questions: {},
  currentResult: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<iQuestions>) => {
      state.questions = action.payload;
    },
    addAnswer: (state, action: PayloadAction<iAnswer>) => {
      state.currentResult.push(action.payload);
    },
  },
});

export const { actions } = quizSlice;

export default quizSlice.reducer;