import { Request, Response } from 'express';

import { User } from "../models/models";

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
    console.log('---- allUsers', request.body);
    try {
      const users = await this.getAllUsers();
      return response.json(users);
    } catch (e) {
      return this.handleError(response, e, 'Error in allUsers:');
    }
  }

  async newUser(request: Request, response: Response): Promise<Response> {
    console.log('---- newUser', request.body);
    try {
      const newUser = new User(request.body);
      await newUser.save();

      const users = await this.getAllUsers();
      return response.json(users);
    } catch (e) {
      return this.handleError(response, e, 'Error in newUser:');
    }
  }

  async editUser(request: Request, response: Response): Promise<Response> {
    console.log('---- editUser', request.query, '/',request.body);
    try {
      const { username } = request.query;
      const updateData = request.body;

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
    console.log('---- deleteUser', request.query);
    try {
      const { username } = request.query;

      const user = await User.findOneAndDelete({ username });

      if (!user) {
        return response.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
      }

      const users = await this.getAllUsers();
      console.log('---- deleteUser', users);

      return response.json(users);
    } catch (e) {
      return this.handleError(response, e, 'Error in deleteUser:');
    }
  }
}

export default new UserController();

