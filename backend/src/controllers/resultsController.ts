import { Request, Response } from 'express';

import { Results } from "../models/models";
import { iUserAnswer } from '../types/resultTypes';
import { getUserStats } from '../utils/forStats/userStats';

const NETWORK_ERROR_MESSAGE = 'Network error';
const RESULT_NOT_FOUND_MESSAGE = 'Result not found. Check query parameters';

class ResultController {
  constructor() {
    this.allResults = this.allResults.bind(this);
    this.userResult = this.userResult.bind(this);
    this.addResult = this.addResult.bind(this);
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      const responseMessage = `${message}: ${error.message}`
      return response.status(500).json({ message: responseMessage});
    }
    console.error(message, error);
    return response.status(500).json({ message: NETWORK_ERROR_MESSAGE });
  }

  async allResults(request: Request, response: Response): Promise<Response> {
    try {
      const allResults = await Results.find();
      return response.json(allResults);
    } catch (e) {
      return this.handleError(response, e, 'Error getting all results');
    }
  }

  async userResult(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;

    if (!username) {
      return response.status(400).json({ message: RESULT_NOT_FOUND_MESSAGE });
    }

    try {
      const userResults = await Results.findOne({ username });
      if (!userResults) {
        return response.status(404).json({ message: RESULT_NOT_FOUND_MESSAGE });
      }
      
      const userStats = getUserStats(userResults);

      return response.json(userStats);
    } catch (e) {
      return this.handleError(response, e, 'Error getting result')
    }
  }

  async addResult(request: Request, response: Response): Promise<Response> {
    const { answers, data } = request.body;
    const { username } = request.query;

    if (!username || !data || !answers) {
      return response.status(400).json({ message: RESULT_NOT_FOUND_MESSAGE });
    }

    const correctAnswers = answers.filter((answer: iUserAnswer) => answer.result === 1).length;

    try {
      const userResults = await Results.findOne({ username });

      if (!!userResults) {
        userResults.attempts.push({ data, answers, correctAnswers });

        if (userResults.attempts.length > 10) {
          userResults.attempts = userResults.attempts.slice(-10)
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
      return response.status(200).json(updatedUserResults);
    } catch (e) {
      return this.handleError(response, e, 'Error adding result');
    }
  }
}

export default new ResultController();

