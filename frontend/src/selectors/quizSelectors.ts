import { RootState } from '../store/index';

export const getQuestions = (state: RootState) => state.quizReducer.questions;
export const getQuestionIndex = (state: RootState) => state.quizReducer.questionIndex;
