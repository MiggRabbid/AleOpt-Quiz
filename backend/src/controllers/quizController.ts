import { Request, Response } from 'express';

import sortAscending from '../utils/sortAscending';
import { Question } from '../models/models';
import { iQuestionModel } from '../types/quizTypes';

const errorTypeMap = {
  userExists: 'userExists',
  networkError: 'networkError',
  notFound: 'notFound',
  regError: 'regError',
};

const errorMsgMap = {
  questionExists: 'This question exists',
  networkError: 'Network error',
  notFound: 'User not found',
};

class QuizController {
  constructor() {
    this.allQuestions = this.allQuestions.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  private prepareError(message: unknown, errorType: string) {
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
    const errorData = this.prepareError(errorMsgMap.networkError, errorTypeMap.networkError);
    return response.status(500).json(errorData);
  }

  private async getSortedQuestions(): Promise<iQuestionModel[]> {
    const questions = await Question.find();
    return sortAscending(questions);
  }

  async allQuestions(request: Request, response: Response): Promise<Response> {
    try {
      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, 'Error in getQuiz:');
    }
  }

  async newQuestion(request: Request, response: Response): Promise<Response> {
    try {
      const newQuestion = new Question(request.body);
      await newQuestion.save();

      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, 'Error in newQuiz:');
    }
  }

  async editQuestion(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.query;
      const updateData = request.body;

      const question = await Question.findOneAndUpdate({ id }, updateData, { new: true });

      if (!question) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const sortedQuestions = await this.getSortedQuestions();

      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, 'Error in editQuestion:');
    }
  }

  async deleteQuestion(request: Request, response: Response): Promise<Response> {
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
      return this.handleError(response, e, 'Error in deleteQuestion:');
    }
  }
}

export default new QuizController();
