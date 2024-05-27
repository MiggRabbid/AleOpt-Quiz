import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User, Role } from "../models/models";

dotenv.config();

const secret = process.env.SECRET_KEY || '';

const getAccessToken = (id: string, role: string, username: string): string => {
  const payload = {
    id, role, username
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
  async signup(request: Request, response: Response): Promise<Response> {
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        return response.status(400).json({ message: validationError.array()[0].msg, validationError });
      }

      const { name, username, password, role } = request.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        return response.status(400).json({ message: 'This user exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: role.toUpperCase() });

      const newUser = new User({ name, username, password: hashPassword, role: userRole?.value });
      console.log('new user -', newUser);
      await newUser.save();

      return response.json({ message: 'User successfully registered' });
    } catch (e) {
      console.log('---- authController', e);
      return response.status(400).json({ message: 'Registration error' });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        console.log(validationError);
        return response.status(400).json({ message: validationError.array()[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = await User.findOne({username});

      if (!user) {
        return response.status(400).json({ message: `User ${username} not found` });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return response.status(400).json({ message: 'Incorrect password entered' });
      }

      const token = getAccessToken(user._id as string, user.role as string, user.username);

      return response.json({token});
    } catch (e) {
      console.log('---- authController', e);
      return response.status(400).json({ message: 'Authorization error' });
    }
  }

  async isLogin(request: Request, response: Response): Promise<Response> {
    try {
      return response.json("SERVER WORK - AUTH");
    } catch (e) {
      console.log('---- authController', e);
      return response.status(400).json({ message: 'isLogin error' });
    }
  }
};

export default new AuthController();
