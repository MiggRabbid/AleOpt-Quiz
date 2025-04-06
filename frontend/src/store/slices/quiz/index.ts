import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadSetQuizStateField, iQuizState } from '@/types/quiz';
import { iUserAnswer } from '@/types/staff';

const initialState: iQuizState = {
  isStarted: false,
  allQuestionsCompleted: false,
  questionIndex: 0,
  questions: [],
  currentResult: [],
};

const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizStateField: <K extends keyof iQuizState>(
      state: iQuizState,
      action: PayloadAction<IPayloadSetQuizStateField<K>>,
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
    clearCurrentResult: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { actions } = quiz;

export default quiz.reducer;
