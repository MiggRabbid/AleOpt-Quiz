import type { iQuizState } from '@app/types';

export const TIME_FOR_ONE_QUESTION = 60;

export const initialState: iQuizState = {
  isStarted: false,
  allQuestionsCompleted: false,
  questionIndex: 0,
  questions: [],
  users: [],
  results: [],
  currentResult: [],
  quizTimer: { seconds: '00', minutes: '00', currTime: 0, maxTime: 0 },
};
