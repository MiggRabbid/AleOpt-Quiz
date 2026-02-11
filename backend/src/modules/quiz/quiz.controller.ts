import type { Request, Response } from 'express';

import type { IQuestionModel, IQuizQuery } from './quiz.types';
import quizService from './quiz.service';

class QuizController {
  async allQuestions(_request: Request, response: Response): Promise<void> {
    const questions = await quizService.getAllQuestions();
    response.json(questions);
  }

  async newQuestion(request: Request, response: Response): Promise<void> {
    const questions = await quizService.createQuestion(request.body as IQuestionModel);
    response.json(questions);
  }

  async editQuestion(request: Request, response: Response): Promise<void> {
    const query = request.query as IQuizQuery;
    const questions = await quizService.updateQuestion(query.id, request.body as IQuestionModel);
    response.json(questions);
  }

  async deleteQuestion(request: Request, response: Response): Promise<void> {
    const query = request.query as IQuizQuery;
    const questions = await quizService.deleteQuestion(query.id);
    response.json(questions);
  }
}

export default new QuizController();
