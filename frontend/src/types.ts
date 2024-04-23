import { iUser, iQuestion } from './interfaces'

export enum UserRole {
  Admin = 'admin',
  Employee = 'employee'
}

export type dataType = { [key: string]: string};

export type responseLoginType = { status: string, data: iUser | { error: string }};

export type responseQuestionsType = { status: string, data: iQuestion[] };

export type questionsType = iQuestion[];