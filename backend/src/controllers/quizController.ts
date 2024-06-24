import { Request, Response } from 'express';
import { Question, } from "../models/models";

class QuizController {

  async allQuestions(request: Request, response: Response): Promise<Response> {
    try {
      const questions = await Question.find();

      const sortedQuestions = questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      
      return response.json(sortedQuestions);
    } catch (e) {
      console.error('Error in getQuiz:', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }

  async newQuestion(request: Request, response: Response): Promise<Response> {
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

  async editQuestion(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const question = await Question.findOneAndUpdate({ id }, updateData, { new: true });

      if (!question) {
        return response.status(404).json({ message: 'Question not found' });
      }

      const users = await Question.find();
      return response.json(users);
    } catch (e) {
      console.error('Error in editQuestion:', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }
};

export default new QuizController();
