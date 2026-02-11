import { SetMetadata } from '@nestjs/common';

import { UserRoles } from '../../modules/user/user.types';

export const REQUIRED_ROLE_KEY = 'requiredRole';
export const RequiredRole = (role: UserRoles) => SetMetadata(REQUIRED_ROLE_KEY, role);
