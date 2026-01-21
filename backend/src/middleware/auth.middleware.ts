import dotenv from 'dotenv';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: {
    role?: string;
    username?: string;
    iat?: number;
    exp?: number;
  };
}

dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY не найден');
}

const secret = process.env.SECRET_KEY;

const errorTypeMap = {
  authError: 'authError',
  tokenExpired: 'tokenExpired',
};

const errorMsgMap = {
  authError: 'Пользователь не авторизован',
  tokenExpired: 'Пользователь не авторизован',
};

const authMiddleware = (request: CustomRequest, response: Response, next: NextFunction): void => {
  if (request.method === 'OPTIONS') {
    next();
  }

  const authHeader = request.headers.authorization || '';

  if (!authHeader?.startsWith('Bearer ')) {
    response.status(403).json({
      message: errorMsgMap.authError,
      typeError: errorTypeMap.authError,
    });
  }

  try {
    const token = authHeader.slice(7);

    const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;

    request.user = decodedData;
    console.log(`BACK / authMiddleware - ${JSON.stringify(request.user)}`);
    next();
  } catch (e) {
    console.error('BACK / authMiddleware', e);
    if (e instanceof TokenExpiredError) {
      response.status(401).json({
        message: errorMsgMap.tokenExpired,
        typeError: errorTypeMap.tokenExpired,
      });
    } else {
      response
        .status(403)
        .json({ message: errorMsgMap.authError, typeError: errorTypeMap.tokenExpired });
    }
  }
};

export default authMiddleware;
