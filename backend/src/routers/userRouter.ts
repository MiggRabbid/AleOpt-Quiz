import { Router } from 'express';
import { check } from 'express-validator';

import { userController } from '../controllers/controllers';
import { authMiddleware, roleMiddleware } from '../middleware/middleware';

import { UserRoles } from '../types/userTypes';

const VALIDATION_ERROR_USERNAME = 'Логин должен быть от 4 до 20 символов';
const VALIDATION_ERROR_PASSWORD = 'Пароль должен быть от 6 до 20 символов';
const VALIDATION_ERROR_FIRSTNAME = 'Имя должно содержать не менее 1 символа';
const VALIDATION_ERROR_LASTNAME = 'Фамилия должна содержать не менее 1 символа';

const validateUsernameAndPassword = [
  check('username', VALIDATION_ERROR_USERNAME).isLength({ min: 4, max: 20 }),
  check('password', VALIDATION_ERROR_PASSWORD).isLength({ min: 6, max: 20 }),
];

const validateName = [
  check('firstName', VALIDATION_ERROR_FIRSTNAME).isLength({ min: 1 }),
  check('lastName', VALIDATION_ERROR_LASTNAME).isLength({ min: 1 }),
];

const validateNewUser = [...validateUsernameAndPassword, ...validateName];

const userRouter = Router();
userRouter.get('/users', roleMiddleware(UserRoles.Admin), userController.allUsers);
userRouter.get('/user', authMiddleware, userController.currentUser);
userRouter.post('/user', validateNewUser, roleMiddleware(UserRoles.Admin), userController.newUser);
userRouter.put('/user', roleMiddleware(UserRoles.Admin), validateNewUser, userController.editUser);
userRouter.delete('/user/', roleMiddleware(UserRoles.Admin), userController.deleteUser);

export default userRouter;
