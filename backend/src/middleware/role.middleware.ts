import { TokenExpiredError } from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';

import type { IAuthenticatedRequest } from './types';
import { ERROR_PRESETS, toErrorResponse } from '../config/error.config';
import { UserRoles } from '../modules/user/user.types';
import { extractBearerToken, verifyAccessToken } from '../utils/auth';
import { hasElevatedRole } from '../utils/access';

const roleMiddleware = (requiredRole: UserRoles) => {
  return (request: IAuthenticatedRequest, response: Response, next: NextFunction): void => {
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
      const payload = verifyAccessToken(token);
      request.user = payload;

      const isRequiredRole = payload.role === requiredRole;
      const isElevated = hasElevatedRole(payload.role);
      const allowed =
        isRequiredRole ||
        (requiredRole === UserRoles.Admin && isElevated) ||
        (requiredRole === UserRoles.Owner && payload.role === UserRoles.Owner);

      if (!allowed) {
        response
          .status(ERROR_PRESETS.accessDenied.statusCode)
          .json(toErrorResponse(ERROR_PRESETS.accessDenied));
        return;
      }

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        response
          .status(ERROR_PRESETS.authTokenExpired.statusCode)
          .json(toErrorResponse(ERROR_PRESETS.authTokenExpired));
        return;
      }

      response
        .status(ERROR_PRESETS.accessDenied.statusCode)
        .json(toErrorResponse(ERROR_PRESETS.accessDenied));
    }
  };
};

export default roleMiddleware;
