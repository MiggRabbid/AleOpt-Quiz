import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const roleMiddleware = (role: string) => {
  return (request: Request, response: Response, next: NextFunction): void => {
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

      console.log('role     -', role);
      console.log('userRole -', userRole);
      console.log('isAdmin  -', isAdmin);

      if (!isAdmin) {
        response.status(403).json({ message: "User is not admin" });
        return;
      }

      next();
    } catch (e) {
      console.log(e);
      response.status(403).json({ message: "User is not admin" });
    }
  }
};

export default roleMiddleware;
