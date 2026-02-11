import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import { sortAscending } from '../../utils';
import Question from './quiz.model';
import type { IQuestionModel } from './quiz.types';

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

class QuizService {
  private async getSortedQuestions(): Promise<IQuestionModel[]> {
    const questions = await Question.find();
    return sortAscending(questions);
  }

  async getAllQuestions(): Promise<IQuestionModel[]> {
    return this.getSortedQuestions();
  }

  async createQuestion(payload: IQuestionModel): Promise<IQuestionModel[]> {
    const normalizedQuestion = payload.question.trim();
    const escapedQuestion = escapeRegExp(normalizedQuestion);
    const questionExists = await Question.findOne({
      question: { $regex: new RegExp(`^${escapedQuestion}$`, 'i') },
    });

    if (questionExists) {
      throw new HttpError(
        ERROR_PRESETS.questionAlreadyExists.statusCode,
        ERROR_PRESETS.questionAlreadyExists.message,
        ERROR_PRESETS.questionAlreadyExists.errorType,
      );
    }

    const newQuestion = new Question(payload);
    await newQuestion.save();

    return this.getSortedQuestions();
  }

  async updateQuestion(id: string | undefined, payload: IQuestionModel): Promise<IQuestionModel[]> {
    if (!id) {
      throw new HttpError(
        ERROR_PRESETS.questionNotFoundBadRequest.statusCode,
        ERROR_PRESETS.questionNotFoundBadRequest.message,
        ERROR_PRESETS.questionNotFoundBadRequest.errorType,
      );
    }

    const updated = await Question.findOneAndUpdate({ id }, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new HttpError(
        ERROR_PRESETS.questionNotFound.statusCode,
        ERROR_PRESETS.questionNotFound.message,
        ERROR_PRESETS.questionNotFound.errorType,
      );
    }

    return this.getSortedQuestions();
  }

  async deleteQuestion(id: string | undefined): Promise<IQuestionModel[]> {
    if (!id) {
      throw new HttpError(
        ERROR_PRESETS.questionNotFoundBadRequest.statusCode,
        ERROR_PRESETS.questionNotFoundBadRequest.message,
        ERROR_PRESETS.questionNotFoundBadRequest.errorType,
      );
    }

    const deleted = await Question.findOneAndDelete({ id });
    if (!deleted) {
      throw new HttpError(
        ERROR_PRESETS.questionNotFound.statusCode,
        ERROR_PRESETS.questionNotFound.message,
        ERROR_PRESETS.questionNotFound.errorType,
      );
    }

    return this.getSortedQuestions();
  }
}

export default new QuizService();
