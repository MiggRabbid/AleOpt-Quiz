import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { ERROR_PRESETS } from '../config/error.config';
import { HttpError } from '../errors/http-error';

const validationMiddleware: RequestHandler = (request, _response, next) => {
  const validationError = validationResult(request);

  if (!validationError.isEmpty()) {
    const firstError = validationError.array()[0];
    throw new HttpError(
      ERROR_PRESETS.validationError.statusCode,
      String(firstError.msg),
      ERROR_PRESETS.validationError.errorType,
    );
  }

  next();
};

export default validationMiddleware;
