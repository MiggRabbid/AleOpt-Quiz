import type { typeQuestionAnswer, iUserStats, iUser, iUserAnswer } from '.';

export interface iQuestion {
  id: string;
  question: string;
  answers: typeQuestionAnswer[];
  correctAnswerId: string;
}

export interface iTimer {
  seconds: string;
  minutes: string;
  currTime: number;
  maxTime: number;
}

export interface iQuizState {
  questions: iQuestion[];
  users: iUser[];
  results: iUserStats[];
  isStarted: boolean;
  allQuestionsCompleted: boolean;
  questionIndex: number;
  currentResult: iUserAnswer[];
  quizTimer: iTimer;
}

export interface IPayloadSetQuizStateField<
  K extends keyof iQuizState,
  V extends iQuizState[K],
> {
  field: K;
  data: V;
}

export interface iResultEntry {
  data: string;
  answers: iUserAnswer[];
  correctAnswers: number;
}
