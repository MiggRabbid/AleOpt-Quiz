import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

import { ERROR_PRESETS, toErrorResponse } from '../../config/error.config';
import { isHttpError } from '../../errors/http-error';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (isHttpError(exception)) {
      response.status(exception.statusCode).json({
        message: exception.message,
        errorType: exception.errorType,
      });
      return;
    }

    console.error('BACK / unhandled error', exception);
    response
      .status(ERROR_PRESETS.internalServerError.statusCode)
      .json(toErrorResponse(ERROR_PRESETS.internalServerError));
  }
}
