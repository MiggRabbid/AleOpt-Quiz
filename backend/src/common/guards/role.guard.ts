import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import { UserRoles } from '../../modules/user/user.types';
import { hasElevatedRole } from '../../utils/access';
import { extractBearerToken, verifyAccessToken } from '../../utils/auth';
import type { IAuthenticatedRequest } from '../types/auth.types';
import { REQUIRED_ROLE_KEY } from '../decorators/required-role.decorator';

@Injectable()
export default class RoleGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector!: Reflector;

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRoles | undefined>(
      REQUIRED_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole) {
      return true;
    }

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
      const payload = verifyAccessToken(token);
      request.user = payload;

      const isRequiredRole = payload.role === requiredRole;
      const isElevated = hasElevatedRole(payload.role);
      const allowed =
        isRequiredRole ||
        (requiredRole === UserRoles.Admin && isElevated) ||
        (requiredRole === UserRoles.Owner && payload.role === UserRoles.Owner);

      if (!allowed) {
        throw new HttpError(
          ERROR_PRESETS.accessDenied.statusCode,
          ERROR_PRESETS.accessDenied.message,
          ERROR_PRESETS.accessDenied.errorType,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (error instanceof TokenExpiredError) {
        throw new HttpError(
          ERROR_PRESETS.authTokenExpired.statusCode,
          ERROR_PRESETS.authTokenExpired.message,
          ERROR_PRESETS.authTokenExpired.errorType,
        );
      }

      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }
  }
}
