import { TokenExpiredError } from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';

import type { IAuthenticatedRequest } from './types';
import { ERROR_PRESETS, toErrorResponse } from '../config/error.config';
import { extractBearerToken, verifyAccessToken } from '../utils/auth';

const authMiddleware = (
  request: IAuthenticatedRequest,
  response: Response,
  next: NextFunction,
): void => {
  if (request.method === 'OPTIONS') {
    next();
    return;
  }

  const token = extractBearerToken(request.headers.authorization);
  if (!token) {
    response
      .status(ERROR_PRESETS.authUnauthorized.statusCode)
      .json(toErrorResponse(ERROR_PRESETS.authUnauthorized));
    return;
  }

  try {
    request.user = verifyAccessToken(token);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      response
        .status(ERROR_PRESETS.authTokenExpired.statusCode)
        .json(toErrorResponse(ERROR_PRESETS.authTokenExpired));
      return;
    }

    response
      .status(ERROR_PRESETS.authUnauthorized.statusCode)
      .json(toErrorResponse(ERROR_PRESETS.authUnauthorized));
  }
};

export default authMiddleware;
