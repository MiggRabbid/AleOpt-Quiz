import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import sortUsersByRole from '../utils/sortAllUser';

import { Role, User } from '../models/models';
import { iResponseUser, iUpdateUserData, UserRoles } from '../types/userTypes';

const errorTypeMap = {
  userExists: 'userExists',
  networkError: 'networkError',
  notFound: 'notFound',
  regError: 'regError',
};

const errorMsgMap = {
  userExists: 'This user exists',
  networkError: 'Network error',
  notFound: 'User not found',
  regError: 'Registration error',
};

class UserController {
  constructor() {
    this.allUsers = this.allUsers.bind(this);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  private prepareError(message: unknown, errorType: string) {
    return {
      message: message,
      errorType: errorType,
    };
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      const errorData = this.prepareError(message, error.name);
      return response.status(500).json(errorData);
    }
    console.error(message, error);
    const errorData = this.prepareError(errorMsgMap.networkError, errorTypeMap.networkError);
    return response.status(500).json(errorData);
  }

  private async getAllUsers(): Promise<iResponseUser[]> {
    const allUser = await User.find();

    const preparedUsers = allUser.map((user) => {
      const { firstName, lastName, username, role, image = '', gender } = user;
      return { firstName, lastName, username, role, image, gender };
    });

    return preparedUsers;
  }

  async currentUser(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = request.query;

      const currentUser = await User.findOne({ username });

      return response.json(currentUser);
    } catch (e) {
      return this.handleError(response, e, 'Error in allUsers:');
    }
  }

  async allUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.getAllUsers();
      const sortedUsers = sortUsersByRole(users);
      return response.json(sortedUsers);
    } catch (e) {
      return this.handleError(response, e, 'Error in allUsers:');
    }
  }

  async newUser(request: Request, response: Response): Promise<Response> {
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
        image: image,
        gender: gender,
      });
      await newUser.save();

      const users = await this.getAllUsers();
      const sortedUsers = sortUsersByRole(users);

      return response.json(sortedUsers);
    } catch (e) {
      const errorData = this.prepareError(errorMsgMap.regError, errorTypeMap.regError);
      return response.status(400).json(errorData);
    }
  }

  async editUser(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = request.query;
      const updateData: iUpdateUserData = {
        role: request.body.role,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
      };

      if (request.body.password.length > 0) {
        const hashPassword = bcrypt.hashSync(request.body.password, 5);
        updateData.password = hashPassword;
      }

      const user = await User.findOneAndUpdate({ username }, updateData, { new: true });

      if (!user) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const users = await this.getAllUsers();
      const sortedUser = sortUsersByRole(users);
      return response.json(sortedUser);
    } catch (e) {
      return this.handleError(response, e, 'Error in editUser:');
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = request.query;
      const user = await User.findOneAndDelete({ username });

      if (!user) {
        const errorData = this.prepareError(errorMsgMap.notFound, errorTypeMap.notFound);
        return response.status(404).json(errorData);
      }

      const users = await this.getAllUsers();
      const sortedUser = sortUsersByRole(users);
      return response.json(sortedUser);
    } catch (e) {
      return this.handleError(response, e, 'Error in deleteUser:');
    } finally {
    }
  }
}

export default new UserController();
