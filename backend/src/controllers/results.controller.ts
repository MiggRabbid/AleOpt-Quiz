import { Request, Response } from 'express';

import { getUserStats, getQuestionStats } from '../utils';

import { Results } from '../models';
import { IUserAnswer } from '../types';

const errorTypeMap = {
  networkError: 'networkError',
  notFound: 'notFound',
} as const;

const errorMsgMap = {
  networkError: 'Ошибка сети',
  notFoundUser: 'Пользователь не найден',
  notFoundResult: 'Результат не найден',
  getResultError: 'Ошибка сервера при получении результатов',
  addingError: 'Ошибка добавления результата',
  getQuestionResultError: 'Ошибка получения результатов по вопросу',
} as const;

class ResultController {
  constructor() {
    this.allResults = this.allResults.bind(this);
    this.userResult = this.userResult.bind(this);
    this.addResult = this.addResult.bind(this);
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      return response.status(500).json({ message });
    }
    console.error(message, error);
    return response.status(500).json({ message: errorMsgMap.networkError });
  }

  async allResults(_request: Request, response: Response): Promise<Response> {
    try {
      const allResults = await Results.find();
      const allStats = allResults.map((result) => getUserStats(result));
      return response.json(allStats);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.getResultError);
    }
  }

  async userResult(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;

    if (!username) {
      return response
        .status(400)
        .json({ message: errorMsgMap.notFoundUser, typeError: errorTypeMap.notFound });
    }

    try {
      const userResults = await Results.findOne({ username });
      if (!userResults) {
        return response
          .status(404)
          .json({ message: errorMsgMap.notFoundResult, typeError: errorTypeMap.notFound });
      }

      const userStats = getUserStats(userResults);

      return response.json(userStats);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.getResultError);
    }
  }

  async addResult(request: Request, response: Response): Promise<Response> {
    const { answers, data } = request.body;
    const { username } = request.query;

    if (!username || !data || !answers) {
      return response.status(400).json({ message: errorMsgMap.notFoundResult });
    }

    try {
      const userResults = await Results.findOne({ username });
      const correctAnswers = answers.reduce((acc: number, item: IUserAnswer) => {
        return acc + item.result;
      }, 0);

      if (!!userResults) {
        userResults.attempts.unshift({ data, answers, correctAnswers });

        if (userResults.attempts.length > 10) {
          userResults.attempts = userResults.attempts.slice(0, 10);
        }

        await userResults.save();
      } else {
        const newResult = new Results({
          username,
          attempts: [{ data, answers, correctAnswers }],
        });

        await newResult.save();
      }

      const updatedUserResults = await Results.findOne({ username });
      if (!updatedUserResults) {
        return response.status(404).json({ message: errorMsgMap.notFoundResult });
      }

      const updatedUserStats = getUserStats(updatedUserResults);

      return response.json(updatedUserStats);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.addingError);
    }
  }

  async questionStats(request: Request, response: Response): Promise<Response> {
    const { question } = request.query;
    try {
      const questionId = question as string;
      const usersStats = await Results.find();
      const questionStats = getQuestionStats(questionId, usersStats);
      return response.json(questionStats);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.getQuestionResultError);
    }
  }
}

export default new ResultController();
