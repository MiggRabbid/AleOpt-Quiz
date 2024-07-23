/* eslint-disable import/no-cycle */
import { typeQuestionAnswer } from './types';

import { iUserAnswer } from './iUser';

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

export interface iResponseQuestions {
  status: string;
  data: iQuestion[];
}
