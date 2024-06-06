import { Request, Response } from 'express';
import { User, Role } from "../models/models";

class UserController {
  async userResult(request: Request, response: Response): Promise<Response> {
    try {
      return response.json({ message: 'User result processed' });
    } catch (e) {
      console.log('---- userController', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }

  async getUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (e) {
      console.log('---- userController', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }
};

export default new UserController();
