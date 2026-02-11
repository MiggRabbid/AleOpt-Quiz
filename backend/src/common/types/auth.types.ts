import type { Request } from 'express';
import { UserRoles } from '../../modules/user/user.types';

export interface IAuthUserPayload {
  role: UserRoles;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IAuthenticatedRequest extends Request {
  user?: IAuthUserPayload;
}
