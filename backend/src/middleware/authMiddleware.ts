import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any; //Нужно поправить этот костыль
}

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const authMiddleware = (request: CustomRequest, response: Response, next: NextFunction): void => {
  console.group('----- roleMiddleware');
  if (request.method === "OPTIONS") {
    console.log('request.method === "OPTIONS" - ', request.method === "OPTIONS");
    console.groupEnd();
    next();
  }

  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token -', !token );
      console.groupEnd();
      response.status(403).json({ message: "User is not authorized" });
      return;
    }

    const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log('decodedData -', decodedData);
    console.groupEnd();
  
    request.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    response.status(403).json({ message: "User is not authorized" });
  }
};

export default authMiddleware;

