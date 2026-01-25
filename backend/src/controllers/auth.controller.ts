import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { type IUserModel, UserRoles } from '../types';

dotenv.config();

const secret = process.env.SECRET_KEY;

const getAccessToken = (role: UserRoles, username: string): string => {
  if (!secret || secret.length === 0) {
    throw new Error('SECRET_KEY is not defined in environment variables');
  }

  const payload = {
    role,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

const errorTypeMap = {
  userNotFound: 'userNotFound',
  incorrectPassword: 'incorrectPassword',
  authError: 'authError',
  userInactive: 'userInactive',
};

const errorMsgMap = {
  userNotFound: 'Пользователь не найден',
  incorrectPassword: 'Неправильный пароль',
  authError: 'Ошибка авторизации',
  userInactive: 'Доступ запрещен для неактивного пользователя',
};

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    console.log(`BACK / login  / start`);

    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        return response
          .status(400)
          .json({ message: validationError.array()[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = (await User.findOne({ username })) as IUserModel;
      if (!user) {
        return response
          .status(404)
          .json({ message: errorMsgMap.userNotFound, errorType: errorTypeMap.userNotFound });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return response.status(401).json({
          message: errorMsgMap.incorrectPassword,
          errorType: errorTypeMap.incorrectPassword,
        });
      }

      if (user.status === 'inactive') {
        return response.status(401).json({
          message: errorMsgMap.userInactive,
          errorType: errorTypeMap.userInactive,
        });
      }

      const { firstName, role, _id: id, image = '' } = user;
      const token = getAccessToken(user.role, user.username);

      console.log(`BACK / login  /  ${user?.firstName} ${user?.lastName} - ${user?.username}`);
      return response.json({ token, id, firstName, username, role, image });
    } catch (e) {
      console.error('BACK / login / error', e);
      return response
        .status(400)
        .json({ message: errorMsgMap.authError, errorType: errorTypeMap.authError });
    }
  }
}

export default new AuthController();
