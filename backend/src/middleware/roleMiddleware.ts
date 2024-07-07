import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const roleMiddleware = (role: string) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    console.group('----- roleMiddleware');
    if (request.method === "OPTIONS") {
      next();
    }

    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        response.status(403).json({ message: "User is not authorized" });
        return;
      }

      const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;

      const userRole = decodedData.role;
      const isAdmin = userRole === role;
      const isOwner = userRole === role;
      console.log('userRole -', userRole);
      console.log('isAdmin -', isAdmin);
      console.log('isOwner -', isOwner);

      if (!isAdmin && !isOwner) {
        console.log('Not admin && not owner -', !isAdmin && !isOwner);
        console.groupEnd();
        response.status(403).json({ message: "User is not admin or not owner" });
        return;
      }

      console.log('admin || owner -', isAdmin && isOwner);
      console.groupEnd();
      next();
    } catch (e) {
      console.log(e);
      response.status(403).json({ message: "User is not admin" });
    }
  }
};

export default roleMiddleware;
