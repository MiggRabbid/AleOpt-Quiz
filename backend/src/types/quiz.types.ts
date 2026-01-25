import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { IErrorResponse } from './errors.types';

export interface IAnswer {
  questionId: string;
  id: string;
  answer: string;
}

export interface IQuestionModel extends Document {
  id: string;
  question: string;
  answers: IAnswer[];
  correctAnswerId: string;
}

export interface IQuizQuery {
  id?: string;
}

export type TQuizResponse = IQuestionModel[] | IErrorResponse;

export type TQuizCustomRequest = Request<ParamsDictionary, any, IQuestionModel, IQuizQuery>;
export type TQuizCustomResponse = Response<TQuizResponse>;
