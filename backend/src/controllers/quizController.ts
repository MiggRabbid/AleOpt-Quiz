import { Request, Response } from 'express';

import sortAscending from '../utils/sortAscending';
import { Question } from '../models/models';
import { iQuestionModel } from '../types/quizTypes';

const NETWORK_ERROR_MESSAGE = 'Network error';
const QUESTION_NOT_FOUND_MESSAGE = 'Question not found';

class QuizController {
  constructor() {
    this.allQuestions = this.allQuestions.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      return response.status(500).json({ message });
    }
    console.error(message, error);
    return response.status(500).json({ message: NETWORK_ERROR_MESSAGE });
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
        return response.status(404).json({ message: QUESTION_NOT_FOUND_MESSAGE });
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
        return response.status(404).json({ message: QUESTION_NOT_FOUND_MESSAGE });
      }

      const sortedQuestions = await this.getSortedQuestions();
      return response.json(sortedQuestions);
    } catch (e) {
      return this.handleError(response, e, 'Error in deleteQuestion:');
    }
  }
}

export default new QuizController();
