import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY не найден');
}

const secret = process.env.SECRET_KEY;

const errorTypeMap = {
  authError: 'authError',
  isNotAdmin: 'isNotAdmin',
};

const errorMsgMap = {
  authError: 'Пользователь не авторизован',
  isNotAdmin: 'У вас нет доступа',
};

const roleMiddleware = (role: string) => {
  return (request: Request, response: Response, next: NextFunction): void => {
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

      if (!token) {
        response
          .status(403)
          .json({ message: errorMsgMap.authError, typeError: errorTypeMap.authError });
        return;
      }

      const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;

      const userRole = decodedData.role;
      const isAdmin = userRole === role;
      const isOwner = userRole === role;

      console.log(`BACK / roleMiddleware - ${JSON.stringify(decodedData)}`);
      if (!isAdmin && !isOwner) {
        response
          .status(403)
          .json({ message: errorMsgMap.isNotAdmin, typeError: errorTypeMap.isNotAdmin });
        return;
      }

      next();
    } catch (e) {
      console.error('BACK / roleMiddleware', e);
      response
        .status(403)
        .json({ message: errorMsgMap.isNotAdmin, typeError: errorTypeMap.isNotAdmin });
    }
  };
};

export default roleMiddleware;
