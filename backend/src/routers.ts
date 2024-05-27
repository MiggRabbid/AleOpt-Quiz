import { Router } from "express";
import { check } from 'express-validator';
import {
  authController, quizController, userController
} from './controllers/controllers';
import { authMiddleware, roleMiddleware } from './middleware/middleware';

const validateUsernameAndPassword = [
  check('username').isLength({ min: 4, max: 20 }),
  check('password').isLength({ min: 6, max: 20 }),
];

const validateName = [
  check('name', 'Name must be between 4 and 20 characters').isLength({ min: 4, max: 20 }),
];

const authRouter = Router();
authRouter.post('/signup', [...validateUsernameAndPassword, ...validateName], authController.signup);
authRouter.post('/login', validateUsernameAndPassword, authController.login);

const userRouter = Router();
userRouter.post('/users', roleMiddleware('ADMIN'), userController.userResult);
userRouter.get('/users', roleMiddleware('ADMIN'), userController.getUsers);

const quizRouter = Router();
quizRouter.post('/questions', roleMiddleware('ADMIN'), quizController.newQuiz);
quizRouter.get('/questions', authMiddleware, quizController.getQuiz);

export { authRouter, userRouter, quizRouter };
