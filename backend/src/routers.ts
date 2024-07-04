import { Router } from 'express';
import { check } from 'express-validator';

import {
  authController,
  quizController,
  userController,
} from './controllers/controllers';
import { authMiddleware, roleMiddleware } from './middleware/middleware';

const validateUsernameAndPassword = [
  check('username').isLength({ min: 4, max: 20 }),
  check('password').isLength({ min: 6, max: 20 }),
];

const validateName = [
  check('name', 'Name must be between 4 and 20 characters').isLength({
    min: 4,
    max: 20,
  }),
];

const authRouter = Router();
authRouter.post(
  '/signup',
  [...validateUsernameAndPassword, ...validateName],
  authController.signup,
);
authRouter.post('/login', validateUsernameAndPassword, authController.login);

const userRouter = Router();
userRouter.get('/users', roleMiddleware('ADMIN'), userController.allUsers);
userRouter.post('/users', roleMiddleware('ADMIN'), userController.newUser);
userRouter.put('/users/edit/:username', roleMiddleware('ADMIN'), userController.editUser);

const quizRouter = Router();
quizRouter.get('/questions', authMiddleware, quizController.allQuestions);
quizRouter.post('/questions', roleMiddleware('ADMIN'), quizController.newQuestion);
userRouter.put('/questions/edit/:id', roleMiddleware('ADMIN'), quizController.editQuestion);

export { authRouter, userRouter, quizRouter };
