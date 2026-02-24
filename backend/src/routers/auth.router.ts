import { Router } from 'express';
import { check } from 'express-validator';

import { authController } from '../controllers';

const VALIDATION_ERROR_USERNAME = 'Username must be between 4 and 20 characters';
const VALIDATION_ERROR_PASSWORD = 'Password must be between 6 and 20 characters';

const validateUsernameAndPassword = [
  check('username', VALIDATION_ERROR_USERNAME).isLength({ min: 4, max: 20 }),
  check('password', VALIDATION_ERROR_PASSWORD).isLength({ min: 6, max: 20 }),
];

const authRouter = Router();
authRouter.post('/login', validateUsernameAndPassword, authController.login);
authRouter.post('/check-token', authController.checkToken);

export default authRouter;
