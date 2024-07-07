import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User, Role } from '../models/models';
import { iUserModel } from '../models/User';

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const getAccessToken = (id: string, role: string, username: string): string => {
  const payload = {
    id,
    role,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    console.group('----- login', request.body);
    console.log('request.body', request.body);
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        console.log(validationError);
        console.groupEnd();
        return response
          .status(400)
          .json({ message: validationError.array()[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = (await User.findOne({ username })) as iUserModel;
      console.log('----- login user - ', user);
      const { role } = user;

      if (!user) {
        console.groupEnd();
        return response
          .status(400)
          .json({ message: `User ${username} not found` });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log('----- login isValidPassword - ', user);

      if (!isValidPassword) {
        console.groupEnd();
        return response
          .status(400)
          .json({ message: 'Incorrect password entered' });
      }

      const token = getAccessToken(
        user._id as string,
        user.role as string,
        user.username,
      );

      console.groupEnd();
      return response.json({ token, username, role });
    } catch (e) {
      console.log('---- authController', e);
      return response.status(400).json({ message: 'Authorization error' });
    }
  }
}

export default new AuthController();
