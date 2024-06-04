import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const authMiddleware = (request: CustomRequest, response: Response, next: NextFunction): void => {
  console.group('----- authMiddleware')
  console.log('request.headers - ', request.headers)
  console.log('request.method  - ', request.method)
  if (request.method === "OPTIONS") {
    console.groupEnd()
    next();
  }

  try {
    const token = request.headers.authorization?.split(' ')[1];
    console.log('token           -', token)

    if (!token) {
      console.groupEnd()
      response.status(403).json({ message: "User is not authorized" });
      return;
    }

    const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log('decodedData     - ', decodedData)

    request.user = decodedData;
    console.log('request.user    - ', request.user)
    console.groupEnd()

    next();
  } catch (e) {
    console.log(e);
    response.status(403).json({ message: "User is not authorized" });
  }
};

export default authMiddleware;

