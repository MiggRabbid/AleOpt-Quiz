import type { ErrorRequestHandler } from 'express';

import { ERROR_PRESETS, toErrorResponse } from '../config/error.config';
import { isHttpError } from '../errors/http-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  if (isHttpError(error)) {
    response.status(error.statusCode).json({
      message: error.message,
      errorType: error.errorType,
    });
    return;
  }

  console.error('BACK / unhandled error', error);
  response
    .status(ERROR_PRESETS.internalServerError.statusCode)
    .json(toErrorResponse(ERROR_PRESETS.internalServerError));
};

export default errorMiddleware;
