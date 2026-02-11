import type { Request, Response } from 'express';

import authService from './auth.service';

class AuthController {
  async login(request: Request, response: Response): Promise<void> {
    const { username, password } = request.body;
    const loginData = await authService.login({ username, password });
    response.json(loginData);
  }
}

export default new AuthController();
