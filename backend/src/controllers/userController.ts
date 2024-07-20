import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import { Role, User } from "../models/models";

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

  private async getAllUsers(): Promise<any[]> {
    return await User.find();
  }

  async allUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = (await this.getAllUsers()).map((user) => {
        const { firstName, lastName, username, role } = user;
        return { firstName, lastName, username, role };
      });
      console.log('users -', users);
      console.groupEnd()
      return response.json(users);
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
        return response.status(400).json({ message: 'This user exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: role.toUpperCase() });

      const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashPassword,
        role: userRole?.value,
      });

      await newUser.save();

      const users = await this.getAllUsers();
      return response.json(users);
    } catch (e) {
      return response.status(400).json({ message: 'Registration error' });
    }
  }

  async editUser(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = request.query;
      const updateData = {
        role: request.body.role,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
      };

      const user = await User.findOneAndUpdate({ username }, updateData, { new: true });

      if (!user) {
        return response.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
      }

      const users = await this.getAllUsers();
      return response.json(users);
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

      return response.json(users);
    } catch (e) {
      return this.handleError(response, e, 'Error in deleteUser:');
    }
  }
}

export default new UserController();

