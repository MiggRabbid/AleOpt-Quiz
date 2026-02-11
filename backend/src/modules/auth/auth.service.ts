import bcrypt from 'bcryptjs';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import { signAccessToken } from '../../utils/auth';
import User from '../user/user.model';
import type { ILoginInput, ILoginResult } from './auth.types';

class AuthService {
  async login(input: ILoginInput): Promise<ILoginResult> {
    const user = await User.findOne({ username: input.username });

    if (!user) {
      throw new HttpError(
        ERROR_PRESETS.userNotFound.statusCode,
        ERROR_PRESETS.userNotFound.message,
        ERROR_PRESETS.userNotFound.errorType,
      );
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new HttpError(
        ERROR_PRESETS.incorrectPassword.statusCode,
        ERROR_PRESETS.incorrectPassword.message,
        ERROR_PRESETS.incorrectPassword.errorType,
      );
    }

    if (user.status === 'inactive') {
      throw new HttpError(
        ERROR_PRESETS.userInactive.statusCode,
        ERROR_PRESETS.userInactive.message,
        ERROR_PRESETS.userInactive.errorType,
      );
    }

    return {
      token: signAccessToken(user.role, user.username),
      id: user.id,
      firstName: user.firstName,
      username: user.username,
      role: user.role,
      image: user.image ?? '',
    };
  }
}

export default new AuthService();
