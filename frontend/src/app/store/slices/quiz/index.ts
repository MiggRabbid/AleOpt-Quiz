import { createSlice } from '@reduxjs/toolkit';

import { initialState, TIME_FOR_ONE_QUESTION } from './index.config';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPayloadSetQuizStateField, iQuizState, iUserAnswer } from '@app/types/';

const quiz = createSlice({
  name: 'quiz',
  initialState: structuredClone(initialState),
  reducers: {
    setQuizStateField: <K extends keyof iQuizState>(
      state: iQuizState,
      action: PayloadAction<IPayloadSetQuizStateField<K, iQuizState[K]>>,
    ) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    setCurrentResult: (state, action: PayloadAction<iUserAnswer[]>) => {
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
    setMaxQuizTime: (state, action: PayloadAction<{ questionsCounter: number }>) => {
      if (state.quizTimer.maxTime <= 0) {
        const { questionsCounter } = action.payload;
        const newMaxTime = TIME_FOR_ONE_QUESTION * questionsCounter;
        state.quizTimer.seconds = String(newMaxTime % 60).padStart(2, '0');
        state.quizTimer.minutes = String(Math.floor(newMaxTime / 60)).padStart(2, '0');
        state.quizTimer.maxTime = newMaxTime;
        state.quizTimer.currTime = newMaxTime;
      }
    },
    clearAllState: () => {
      return structuredClone(initialState);
    },
    clearResultState: (state) => {
      return {
        ...structuredClone(initialState),
        questions: state.questions,
        users: state.users,
      };
    },
  },
});

export const { actions } = quiz;

export default quiz.reducer;
