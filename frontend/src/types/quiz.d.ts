import { typeQuestionAnswer } from './types';

import { iUserAnswer } from './staff';

export interface iQuestion {
  id: string;
  question: string;
  answers: typeQuestionAnswer[];
  correctAnswerId: string;
}

export interface iQuizState {
  isStarted: boolean;
  questionIndex: number;
  questions: iQuestion[];
  currentResult: iUserAnswer[];
}

export interface IPayloadSetQuizStateField<K extends keyof iQuizState> {
  field: K;
  data: iQuizState[K];
}

export interface iResponseQuestions {
  status: string;
  data: iQuestion[];
}

export interface iResultEntry {
  data: string;
  answers: iUserAnswer[];
  correctAnswers: number;
}
