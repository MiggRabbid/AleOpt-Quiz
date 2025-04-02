import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import { Role, User } from '../models/models';
import { iResponseUser, iUpdateUserData } from '../types/userTypes';
import sortUsersByRole from '../utils/sortAllUser';

const NETWORK_ERROR_MESSAGE = 'Network error';
const USER_NOT_FOUND_MESSAGE = 'User not found';

class UserController {
  constructor() {
    this.allUsers = this.allUsers.bind(this);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  private handleError(response: Response, error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(message, error);
      return response.status(500).json({ message });
    }
    console.error(message, error);
    return response.status(500).json({ message: NETWORK_ERROR_MESSAGE });
  }

  private async getAllUsers(): Promise<iResponseUser[]> {
    const allUser = await User.find();
    return allUser.map((user) => {
      const { firstName, lastName, username, role, image = '' } = user;
      return { firstName, lastName, username, role, image };
    });
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
      console.log('sortedUser -', sortedUsers);
      return response.json(sortedUsers);
    } catch (e) {
      return this.handleError(response, e, 'Error in allUsers:');
    }
  }

  async newUser(request: Request, response: Response): Promise<Response> {
    try {
      const validationError = validationResult(request);

      if (!validationError.isEmpty()) {
        return response
          .status(400)
          .json({ message: validationError.array()[0].msg, validationError });
      }

      const { firstName, lastName, username, password, role } = request.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        return response.status(400).json({ message: 'This user exists', errorType: 'userExists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: role });
      const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashPassword,
        role: userRole?.value,
        image: '',
      });
      await newUser.save();

      const users = await this.getAllUsers();
      const sortedUsers = sortUsersByRole(users);
      return response.json(sortedUsers);
    } catch (e) {
      return response.status(400).json({ message: 'Registration error', errorType: 'regError' });
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
        return response.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
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
        return response.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
      }

      const users = await this.getAllUsers();
      const sortedUser = sortUsersByRole(users);
      return response.json(sortedUser);
    } catch (e) {
      return this.handleError(response, e, 'Error in deleteUser:');
    }
  }
}

export default new UserController();
