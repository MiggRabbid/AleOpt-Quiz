import type { Request, Response } from 'express';

import type { IAuthenticatedRequest } from '../../middleware/types';
import type { ICreateUserData, IUpdateUserData, IUserQuery } from './user.types';
import userService from './user.service';

class UserController {
  async currentUser(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const { username } = request.query as IUserQuery;
    const user = await userService.getCurrentUser(request.user, username);
    response.json(user);
  }

  async allUsers(_request: Request, response: Response): Promise<void> {
    const users = await userService.getAllUsers();
    response.json(users);
  }

  async newUser(request: Request, response: Response): Promise<void> {
    const users = await userService.createUser(request.body as ICreateUserData);
    response.json(users);
  }

  async editUser(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const { username } = request.query as IUserQuery;
    const payload = request.body as IUpdateUserData;
    const users = await userService.updateUser(request.user, username, payload);
    response.json(users);
  }

  async deleteUser(request: IAuthenticatedRequest, response: Response): Promise<void> {
    const { username } = request.query as IUserQuery;
    const users = await userService.deleteUser(request.user, username);
    response.json(users);
  }
}

export default new UserController();
