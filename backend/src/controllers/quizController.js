import { Question } from "../models/models.js";

class quizController {
  async newQuiz(request, response) {
    try {
      const newQuestion = new Question(request.body);
      console.log('newQuestion -', newQuestion);

      await newQuestion.save();

      return response.json({ message: 'New question added' })
    } catch (e) {
      
    }
  }

  async getQuiz(request, response) {
    try {
      const question = await Question.find();
      response.json(question)
    } catch (e) {
      response.json({ message: 'Network error' })
    }
  }
};

export default new quizController();