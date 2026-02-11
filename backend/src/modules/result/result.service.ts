import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import type { IAuthUserPayload } from '../../middleware/types';
import { canAccessUsername } from '../../utils/access';
import { getQuestionStats, getUserStats } from '../../utils';
import Results from './result.model';
import type { IUserAnswer } from './result.types';

interface IAddResultPayload {
  answers: IUserAnswer[];
  data: string;
}

class ResultService {
  async getAllResults() {
    const allResults = await Results.find();
    return allResults.map((result) => getUserStats(result));
  }

  async getUserResult(actor: IAuthUserPayload | undefined, username: string | undefined) {
    const targetUsername = username ?? actor?.username;
    if (!targetUsername) {
      throw new HttpError(
        ERROR_PRESETS.userNotFound.statusCode,
        ERROR_PRESETS.userNotFound.message,
        ERROR_PRESETS.userNotFound.errorType,
      );
    }

    if (!canAccessUsername(actor, targetUsername)) {
      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }

    const userResults = await Results.findOne({ username: targetUsername });
    if (!userResults) {
      throw new HttpError(
        ERROR_PRESETS.resultNotFound.statusCode,
        ERROR_PRESETS.resultNotFound.message,
        ERROR_PRESETS.resultNotFound.errorType,
      );
    }

    return getUserStats(userResults);
  }

  async addResult(
    actor: IAuthUserPayload | undefined,
    username: string | undefined,
    payload: IAddResultPayload,
  ) {
    const targetUsername = username ?? actor?.username;
    if (!targetUsername || !payload.data || !payload.answers) {
      throw new HttpError(
        ERROR_PRESETS.resultNotFound.statusCode,
        ERROR_PRESETS.resultNotFound.message,
        ERROR_PRESETS.resultNotFound.errorType,
      );
    }

    if (!canAccessUsername(actor, targetUsername)) {
      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }

    const correctAnswers = payload.answers.reduce((acc: number, item: IUserAnswer) => {
      return acc + item.result;
    }, 0);

    const userResults = await Results.findOne({ username: targetUsername });
    if (userResults) {
      userResults.attempts.unshift({
        data: payload.data,
        answers: payload.answers,
        correctAnswers,
      });

      if (userResults.attempts.length > 10) {
        userResults.attempts = userResults.attempts.slice(0, 10);
      }

      await userResults.save();
      return getUserStats(userResults);
    }

    const newResult = new Results({
      username: targetUsername,
      attempts: [{ data: payload.data, answers: payload.answers, correctAnswers }],
    });
    await newResult.save();

    return getUserStats(newResult);
  }

  async getQuestionStats(questionId: string | undefined) {
    if (!questionId) {
      throw new HttpError(
        ERROR_PRESETS.questionNotFoundBadRequest.statusCode,
        ERROR_PRESETS.questionNotFoundBadRequest.message,
        ERROR_PRESETS.questionNotFoundBadRequest.errorType,
      );
    }

    const usersStats = await Results.find();
    return getQuestionStats(questionId, usersStats);
  }
}

export default new ResultService();
