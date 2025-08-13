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
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    console.log(`----- login start`);
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        return response
          .status(400)
          .json({ message: validationError.array()[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = (await User.findOne({ username })) as iUserModel;
      if (!user) {
        return response
          .status(401)
          .json({ message: `Invalid username or password`, errorType: 'InvalidUserData' });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return response
          .status(401)
          .json({ message: 'Invalid username or password', errorType: 'InvalidUserData' });
      }

      const { firstName, role, _id: id, image = '' } = user;
      const token = getAccessToken(user.role as string, user.username);

      console.log(`----- login - ${user?.firstName} ${user?.lastName} - ${user?.username}`);
      return response.json({ token, id, firstName, username, role, image });
    } catch (e) {
      console.error('---- authController', e);
      return response.status(400).json({ message: 'Authorization error', errorType: 'authError' });
    }
  }
}

export default new AuthController();
