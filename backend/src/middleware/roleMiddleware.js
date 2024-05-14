import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.SECRET_KEY;

const roleMiddleware = ( role ) => {
  return (request, response, next) => {
    if (request.method === "OPTIONS") next();

    try {
      console.log()
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        return response.status(403).json({ message: "User is not authorized" });
      }

      const { role: userRole } = jwt.verify(token, secret);
      const isAdmin = userRole === role;

      console.log('role     -', role);
      console.log('userRole -', userRole);
      console.log('isAdmin  -', isAdmin);

      if (!isAdmin) {
        return response.status(403).json({ message: "User is not admin" })
      }

      next();
    } catch (e) {
      console.log(e);
      return response.status(403).json({ message: "User is not admin" });
    }
  }
};

export default roleMiddleware;