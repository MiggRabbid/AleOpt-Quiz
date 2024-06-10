import { Request, Response } from 'express';
import { Question, } from "../models/models";

class QuizController {
  async newQuiz(request: Request, response: Response): Promise<Response> {
    try {
      const newQuestion = new Question(request.body);
      await newQuestion.save();

      const questions = await Question.find();
      const sortedQuestions = questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

      return response.json(sortedQuestions);
    } catch (e) {
      console.error('Error in newQuiz:', e);
      return response.status(500).json({ message: 'Network error' }, );
    }
  }

  async getQuiz(request: Request, response: Response): Promise<Response> {
    try {
      const questions = await Question.find();

      const sortedQuestions = questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      
      return response.json(sortedQuestions);
    } catch (e) {
      console.error('Error in getQuiz:', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }
};

export default new QuizController();
