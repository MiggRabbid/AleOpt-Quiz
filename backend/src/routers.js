import { Router } from "express";

import { authController, quizController, userController } from './controllers/controllers.js';

const authRouter  = new Router();
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/', authController.isLogin);

const userRouter = new Router()
userRouter.post('/users', userController.userResult);
userRouter.get('/users', userController.getUsers);

const quizRouter  = new Router();
quizRouter.post('/quiz', quizController.newQuiz);
quizRouter.get('/questions', quizController.getQuiz);

export { authRouter, userRouter, quizRouter };