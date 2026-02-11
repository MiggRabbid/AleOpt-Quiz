import type { Response } from 'express';

import type { IAuthenticatedRequest } from '../../middleware/types';
import type { IUserAnswer } from './result.types';
import resultService from './result.service';

class ResultController {
  async allResults(_request: IAuthenticatedRequest, response: Response): Promise<void> {
    const results = await resultService.getAllResults();
    response.json(results);
  }

  async userResult(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const username = request.query.username as string | undefined;
    const result = await resultService.getUserResult(request.user, username);
    response.json(result);
  }

  async addResult(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const username = request.query.username as string | undefined;
    const payload = request.body as { answers: IUserAnswer[]; data: string };
    const result = await resultService.addResult(request.user, username, payload);
    response.json(result);
  }

  async questionStats(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const questionId = request.query.question as string | undefined;
    const stats = await resultService.getQuestionStats(questionId);
    response.json(stats);
  }
}

export default new ResultController();
