import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const roleMiddleware = (role: string) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    if (request.method === 'OPTIONS') {
      next();
    }

    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        response.status(403).json({ message: 'User is not authorized' });
        return;
      }

      const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;

      const userRole = decodedData.role;
      const isAdmin = userRole === role;
      const isOwner = userRole === role;

      console.log(`----- roleMiddleware - ${JSON.stringify(decodedData)}`);
      if (!isAdmin && !isOwner) {
        response.status(403).json({ message: 'User is not admin or not owner' });
        return;
      }

      next();
    } catch (e) {
      console.error('---- roleMiddleware', e);
      response.status(403).json({ message: 'User is not admin' });
    }
  };
};

export default roleMiddleware;
