import { Router } from 'express';
import { check } from 'express-validator';

import { asyncMiddleware, validationMiddleware } from '../middleware';
import authController from '../modules/auth/auth.controller';

const VALIDATION_ERROR_USERNAME = 'Username must be between 4 and 20 characters';
const VALIDATION_ERROR_PASSWORD = 'Password must be between 6 and 20 characters';

const validateUsernameAndPassword = [
  check('username', VALIDATION_ERROR_USERNAME).isLength({ min: 4, max: 20 }),
  check('password', VALIDATION_ERROR_PASSWORD).isLength({ min: 6, max: 20 }),
];

const authRouter = Router();
authRouter.post(
  '/login',
  validateUsernameAndPassword,
  validationMiddleware,
  asyncMiddleware(authController.login.bind(authController)),
);

export default authRouter;
