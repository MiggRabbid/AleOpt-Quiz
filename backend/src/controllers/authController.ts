import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User } from '../models/models';

import { iUserModel } from '../types/userTypes';

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const getAccessToken = (role: string, username: string): string => {
  const payload = {
    role,
    username,
  };
  return jwt.sign(payload, secret);
};

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        return response
          .status(400)
          .json({ message: validationError.array()[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = (await User.findOne({ username })) as iUserModel;
      console.log(`----- login - ${user.firstName} ${user.lastName} - ${user.username}`);
      const { role } = user;

      if (!user) {
        return response.status(400).json({ message: `User ${username} not found` });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return response.status(400).json({ message: 'Incorrect password entered' });
      }

      const token = getAccessToken(user.role as string, user.username);

      return response.json({ token, username, role });
    } catch (e) {
      console.error('---- authController', e);
      return response.status(400).json({ message: 'Authorization error' });
    }
  }
}

export default new AuthController();
