import { RootState } from '../app/store/index';

export const getQuestions = (state: RootState) => state.quizReducer.questions;

export const getQuestionIndex = (state: RootState) => state.quizReducer.questionIndex;

export const getCurrentResult = (state: RootState) => state.quizReducer.currentResult;
