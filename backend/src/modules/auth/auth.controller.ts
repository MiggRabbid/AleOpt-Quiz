import { Body, Controller, Post } from '@nestjs/common';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import authService from './auth.service';
import type { ILoginInput, ILoginResult } from './auth.types';

const VALIDATION_ERROR_USERNAME = 'Username must be between 4 and 20 characters';
const VALIDATION_ERROR_PASSWORD = 'Password must be between 6 and 20 characters';

const validateLoginPayload = (payload: ILoginInput): void => {
  if (!payload.username || payload.username.length < 4 || payload.username.length > 20) {
    throw new HttpError(
      ERROR_PRESETS.validationError.statusCode,
      VALIDATION_ERROR_USERNAME,
      ERROR_PRESETS.validationError.errorType,
    );
  }

  if (!payload.password || payload.password.length < 6 || payload.password.length > 20) {
    throw new HttpError(
      ERROR_PRESETS.validationError.statusCode,
      VALIDATION_ERROR_PASSWORD,
      ERROR_PRESETS.validationError.errorType,
    );
  }
};

@Controller('auth')
export default class AuthController {
  @Post('login')
  async login(@Body() payload: ILoginInput): Promise<ILoginResult> {
    validateLoginPayload(payload);
    return authService.login(payload);
  }
}
