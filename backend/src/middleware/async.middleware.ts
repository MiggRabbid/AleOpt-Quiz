import type { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncMiddleware = (handler: RequestHandler): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
};

export default asyncMiddleware;
