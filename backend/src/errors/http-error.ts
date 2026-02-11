export class HttpError extends Error {
  statusCode: number;

  errorType: string;

  constructor(statusCode: number, message: string, errorType: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
  }
}

export const isHttpError = (value: unknown): value is HttpError => value instanceof HttpError;
