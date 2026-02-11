import jwt, { type JwtPayload } from 'jsonwebtoken';

import { getRequiredEnv } from '../config/env';
import { UserRoles } from '../modules/user/user.types';
import type { IAuthUserPayload } from '../middleware/types';

const secretKey = getRequiredEnv('SECRET_KEY');

export const extractBearerToken = (authHeader?: string): string | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7).trim();
  return token.length > 0 ? token : null;
};

export const verifyAccessToken = (token: string): IAuthUserPayload => {
  const payload = jwt.verify(token, secretKey) as JwtPayload;

  return {
    role: payload.role as UserRoles,
    username: payload.username as string,
    iat: payload.iat,
    exp: payload.exp,
  };
};

export const signAccessToken = (role: UserRoles, username: string): string =>
  jwt.sign({ role, username }, secretKey, { expiresIn: '7d' });
