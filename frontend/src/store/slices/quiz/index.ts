import { createSlice } from '@reduxjs/toolkit';

import { initialState, TIME_FOR_ONE_QUESTION } from './index.config';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadSetQuizStateField, iQuizState } from '@/types/quiz';
import { iUserAnswer } from '@/types/staff.types';

const quiz = createSlice({
  name: 'quiz',
  initialState: structuredClone(initialState),
  reducers: {
    setQuizStateField: <K extends keyof iQuizState>(
      state: iQuizState,
      action: PayloadAction<IPayloadSetQuizStateField<K, iQuizState[K]>>,
    ) => {
      console.groupCollapsed('setQuizStateField -', action.payload.field);
      console.log('data -', action.payload.data);
      console.groupEnd();

      const { field, data } = action.payload;
      state[field] = data;
    },
    setCurrentResult: (state, action: PayloadAction<iUserAnswer[]>) => {
      console.log('setCurrentResult');
      return {
        ...state,
        questionIndex: action.payload.length,
        currentResult: action.payload,
      };
    },
    addAnswer: (state, action: PayloadAction<iUserAnswer>) => {
      console.log('addAnswer');
      return {
        ...state,
        currentResult: [...state.currentResult, action.payload],
      };
    },
    nextQuestion: (state) => {
      console.log('nextQuestion');
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      };
    },
    setMaxQuizTime: (state, action: PayloadAction<{ questionsCounter: number }>) => {
      console.log('setMaxQuizTime');
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
      console.log('clearState');
      return structuredClone(initialState);
    },
    clearResultState: (state) => {
      console.log('clearResultState');
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
