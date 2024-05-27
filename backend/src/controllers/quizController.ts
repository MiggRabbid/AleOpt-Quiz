import { Request, Response } from 'express';
import { Question } from "../models/models";

class QuizController {
  async newQuiz(request: Request, response: Response): Promise<Response> {
    try {
      const newQuestion = new Question(request.body);
      console.log('newQuestion -', newQuestion);

      await newQuestion.save();

      return response.json({ message: 'New question added' });
    } catch (e) {
      console.log('---- quizController', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }

  async getQuiz(request: Request, response: Response): Promise<Response> {
    try {
      const question = await Question.find();
      return response.json(question);
    } catch (e) {
      console.log('---- quizController', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }
};

export default new QuizController();
