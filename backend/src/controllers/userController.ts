import { Request, Response } from 'express';
import { User } from "../models/models";

class UserController {
  async allUsers(request: Request, response: Response): Promise<Response> {
    console.log('---- editUser', request.body);
    try {
      const users = await User.find();
      return response.json(users);
    } catch (e) {
      console.log('---- userController', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }

  async newUser(request: Request, response: Response): Promise<Response> {
    console.log('---- newUsers', request.body);
    try {
      const newUsers = new User(request.body);
      await newUsers.save();

      const users = await User.find();
      return response.json(users);
    } catch (e) {
      console.error('Error in newUsers:', e);
      return response.status(500).json({ message: 'Network error' }, );
    }
  }

  async editUser(request: Request, response: Response): Promise<Response> {
    console.log('---- editUser', request.body);
    try {
      const { username } = request.params;
      const updateData = request.body;

      const user = await User.findOneAndUpdate({ username }, updateData, { new: true });

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      const users = await User.find();
      return response.json(users);
    } catch (e) {
      console.error('Error in editUser:', e);
      return response.status(500).json({ message: 'Network error' });
    }
  }
};

export default new UserController();
