import { Router } from "express";
import { check } from 'express-validator';

import {
  authController, quizController, userController
} from './controllers/controllers.js';
import { authMiddleware, roleMiddleware } from './middleware/middleware.js';

const validateUsernameAndPassword = [
  check('username').isLength({ min: 4, max: 20 }),
  check('password').isLength({ min: 6, max: 20 }),
]

const validateName = [
  check('name', 'Name must be between 4 and 20 characters').isLength({ min: 4, max: 20 }),
]

const authRouter  = new Router();
authRouter.post('/signup', [...validateUsernameAndPassword, ...validateName], authController.signup);
authRouter.post('/login', validateUsernameAndPassword, authController.login);

const userRouter = new Router()
userRouter.post('/users', roleMiddleware('ADMIN'), userController.userResult);
userRouter.get('/users', roleMiddleware('ADMIN'), userController.getUsers);

const quizRouter  = new Router();
quizRouter.post('/questions', roleMiddleware('ADMIN'), quizController.newQuiz);
quizRouter.get('/questions', authMiddleware, quizController.getQuiz);

export { authRouter, userRouter, quizRouter };