import { Request, Response } from 'express';

import { sortAscending } from '../utils';

import { Question } from '../models';
import type { IQuestionModel, TQuizCustomRequest, TQuizCustomResponse } from '../types';

const errorTypeMap = {
  questionExists: 'questionExists',
  networkError: 'networkError',
  notFound: 'notFound',
} as const;

const errorMsgMap = {
  questionExists: 'Такой вопрос уже существует',
  networkError: 'Ошибка сети',
  notFound: 'Вопрос не найден',
  createError: 'Ошибка создания вопроса',
  editError: 'Ошибка редактирования вопроса',
  deleteError: 'Ошибка удаления вопроса',
  getQuestionError: 'Ошибка сервера при получении вопросов',
} as const;

class QuizController {
  constructor() {
    this.allQuestions = this.allQuestions.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  private prepareError(message: string, errorType: string) {
    return {
      message,
      errorType,
    };
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      const errorData = this.prepareError(message, error.name);
      return response.status(500).json(errorData);
    }
    console.error(message, error);
    const errorData = this.prepareError(message, errorTypeMap.networkError);
    return response.status(500).json(errorData);
  }

  private async getSortedQuestions(): Promise<IQuestionModel[]> {
    const questions = await Question.find();
    return sortAscending(questions);
  }

  async allQuestions(_request: Request, response: Response): Promise<Response> {
    try {
      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.getQuestionError);
    }
  }

  async newQuestion(request: TQuizCustomRequest, response: TQuizCustomResponse): Promise<Response> {
    try {
      const allQuestions = await Question.find();

      const questionExists = allQuestions.find(
        (question) =>
          question.question.toLocaleLowerCase().trim() ===
          request.body.question.toLocaleLowerCase().trim(),
      );

      if (questionExists) {
        const errorData = this.prepareError(
          errorMsgMap.questionExists,
          errorTypeMap.questionExists,
        );
        return response.status(400).json(errorData);
      }

      const newQuestion = new Question(request.body);
      await newQuestion.save();

      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.createError);
    }
  }

  async editQuestion(
    request: TQuizCustomRequest,
    response: TQuizCustomResponse,
  ): Promise<Response> {
    try {
      const { id } = request.query;
      const updateData = request.body;

      const question = await Question.findOneAndUpdate({ id }, updateData, {
        new: true,
        runValidators: true,
      });

      if (!question) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const sortedQuestions = await this.getSortedQuestions();

      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.editError);
    }
  }

  async deleteQuestion(
    request: TQuizCustomRequest,
    response: TQuizCustomResponse,
  ): Promise<Response> {
    try {
      const { id } = request.query;

      const question = await Question.findOneAndDelete({ id });

      if (!question) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.deleteError);
    }
  }
}

export default new QuizController();
