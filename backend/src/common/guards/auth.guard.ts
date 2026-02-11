import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import type { IAuthenticatedRequest } from '../types/auth.types';
import { extractBearerToken, verifyAccessToken } from '../../utils/auth';

@Injectable()
export default class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();

    const token = extractBearerToken(request.headers.authorization);
    if (!token) {
      throw new HttpError(
        ERROR_PRESETS.authUnauthorized.statusCode,
        ERROR_PRESETS.authUnauthorized.message,
        ERROR_PRESETS.authUnauthorized.errorType,
      );
    }

    try {
      request.user = verifyAccessToken(token);
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpError(
          ERROR_PRESETS.authTokenExpired.statusCode,
          ERROR_PRESETS.authTokenExpired.message,
          ERROR_PRESETS.authTokenExpired.errorType,
        );
      }

      throw new HttpError(
        ERROR_PRESETS.authUnauthorized.statusCode,
        ERROR_PRESETS.authUnauthorized.message,
        ERROR_PRESETS.authUnauthorized.errorType,
      );
    }
  }
}
