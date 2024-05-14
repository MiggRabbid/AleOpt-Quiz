import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.SECRET_KEY;

const authMiddleware = (request, response, next) => {
  if (request.method === "OPTIONS") next();

  try {
    console.log()
    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      return response.status(403).json({ message: "User is not authorized" });
    }

    const decoderData = jwt.verify(token, secret);

    request.user = decoderData;

    next();
  } catch (e) {
    console.log(e);
    return response.status(403).json({ message: "User is not authorized" });
  }
};

export default authMiddleware;
