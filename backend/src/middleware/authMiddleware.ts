import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const authMiddleware = (request: CustomRequest, response: Response, next: NextFunction): void => {
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

    request.user = decodedData;

    next();
  } catch (e) {
    console.log(e);
    response.status(403).json({ message: "User is not authorized" });
  }
};

export default authMiddleware;
