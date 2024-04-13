import { RootState } from '../store/index';

export const getQuestions = (state: RootState) => state.quizReducer.questions;