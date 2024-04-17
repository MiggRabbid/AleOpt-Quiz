import { iUser, iQuestion } from './interfaces'

export enum Result {
  Admin = 'admin',
  Employee = 'employee'
}

export type dataType = { [key: string]: string | iQuestion};

export type responseLoginType = { status: string, data: iUser | { error: string }};

export type responseQuestionsType = { status: string, data: dataType };

export type questionsType = iQuestion[];

export type currentAnswerType = {
  userAnswer: string,
  correctAnswer: string,
  result: number,
} | null;