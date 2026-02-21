import type { ParamsDictionary } from 'express-serve-static-core';
import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import { getUserStats, sortUsersByRole } from '../utils';

import { Results, Role, User } from '../models';
import { UserStatus } from '../types';
import type {
  ICreateUserData,
  IResponseUser,
  IUpdateUserData,
  IUserQuery,
  TUserRes,
  IResponseShortUser,
  TUserCustomResponse,
  TUserCustomRequest,
} from '../types';

const errorTypeMap = {
  userExists: 'userExists',
  networkError: 'networkError',
  notFound: 'notFound',
  regError: 'regError',
} as const;

const errorMsgMap = {
  userExists: 'Пользователь с таким именем уже существует',
  networkError: 'Ошибка сети',
  otherError: 'Ошибка получения данных',
  notFound: 'Пользователь не найден',
  regError: 'Ошибка регистрации',
} as const;

class UserController {
  constructor() {
    this.allUsers = this.allUsers.bind(this);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  private prepareError(message: string, errorType: string) {
    return {
      message,
      errorType,
    };
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      const errorData = this.prepareError(message, error.name);
      return response.status(500).json(errorData);
    }
    console.error(message, error);
    const errorData = this.prepareError(message, errorTypeMap.networkError);
    return response.status(500).json(errorData);
  }

  private async getAllUsers(): Promise<IResponseUser[]> {
    const allUser = await User.find();
    const AllResults = await Results.find();

    const preparedUsers = allUser.map((user) => {
      const currUser: IResponseUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        image: user.image ?? '',
        gender: user.gender,
        status: user.status,
        numberAttempts: 0,
        lastResult: null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      const result = AllResults.find((res) => res.username === currUser.username);

      if (result) {
        const userResult = getUserStats(result);
        const lastAttempt = Math.floor(
          (userResult.attempts[0].correctAnswers / userResult.attempts[0].answers.length) * 100,
        );
        currUser.lastResult = lastAttempt;
        currUser.numberAttempts = userResult.numberAttempts;
      }

      return currUser;
    });

    return preparedUsers;
  }

  async currentUser(request: Request, response: Response<TUserRes>): Promise<Response> {
    try {
      const { username } = request.query;

      const currentUser = await User.findOne({ username });

      if (!currentUser) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }
      const responseUser: IResponseShortUser = {
        role: currentUser.role,
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        gender: currentUser.gender,
        image: currentUser.image ?? '',
        status: currentUser.status,
      };

      return response.json(responseUser);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.networkError);
    }
  }

  async allUsers(_request: TUserCustomRequest, response: TUserCustomResponse): Promise<Response> {
    try {
      const users = await this.getAllUsers();
      const sortedUsers = sortUsersByRole(users);
      return response.json(sortedUsers);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.otherError);
    }
  }

  async newUser(
    request: Request<ParamsDictionary, any, ICreateUserData, IUserQuery>,
    response: TUserCustomResponse,
  ): Promise<Response> {
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        const { msg, type } = validationError.array()[0];

        const errorData = this.prepareError(msg, type);
        return response.status(400).json(errorData);
      }

      const { firstName, lastName, username, password, role, image, gender } = request.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        const errorData = this.prepareError(errorMsgMap.userExists, errorTypeMap.userExists);
        return response.status(400).json(errorData);
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: role });

      const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashPassword,
        role: userRole?.value,
        image,
        gender,
        status: UserStatus.Active,
        createdAt: new Date(),
      });
      await newUser.save();

      const users = await this.getAllUsers();
      const sortedUsers = sortUsersByRole(users);

      return response.json(sortedUsers);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.regError);
    }
  }

  async editUser(request: TUserCustomRequest, response: TUserCustomResponse): Promise<Response> {
    try {
      const { username } = request.query;
      const updateData: IUpdateUserData = {
        role: request.body.role,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        status: request.body.status,
        updatedAt: new Date(),
        image: request.body.image,
      };

      if (!!request.body.password && request.body.password.length > 0) {
        const hashPassword = bcrypt.hashSync(request.body.password, 5);
        updateData.password = hashPassword;
      }

      const user = await User.findOneAndUpdate({ username }, updateData, {
        new: true,
      });

      if (!user) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const users = await this.getAllUsers();
      const sortedUser = sortUsersByRole(users);
      return response.json(sortedUser);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.otherError);
    }
  }

  async deleteUser(request: TUserCustomRequest, response: Response): Promise<Response> {
    try {
      const { username } = request.query;
      const user = await User.findOneAndDelete({ username });

      if (!user) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      await Results.findOneAndDelete({ username });

      const users = await this.getAllUsers();
      const sortedUser = sortUsersByRole(users);
      return response.json(sortedUser);
    } catch (e) {
      return this.handleError(response, e, errorMsgMap.otherError);
    }
  }
}

export default new UserController();
