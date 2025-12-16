import dotenv from 'dotenv';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: {
    role?: string;
    username?: string;
    iat?: number;
    exp?: number;
  };
}

dotenv.config();

const secret = process.env.SECRET_KEY || '';

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

  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      response
        .status(403)
        .json({ message: errorMsgMap.authError, typeError: errorTypeMap.authError });
      return;
    }

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
