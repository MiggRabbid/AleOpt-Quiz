import { UserRoles } from '../modules/user/user.types';
import type { IAuthUserPayload } from '../middleware/types';

export const hasElevatedRole = (role?: UserRoles): boolean =>
  role === UserRoles.Owner || role === UserRoles.Admin;

export const canAccessUsername = (
  user: IAuthUserPayload | undefined,
  targetUsername: string,
): boolean => {
  if (!user) {
    return false;
  }

  return hasElevatedRole(user.role) || user.username === targetUsername;
};
