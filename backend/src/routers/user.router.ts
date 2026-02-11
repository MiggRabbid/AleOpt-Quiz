import { Router } from 'express';
import { check } from 'express-validator';

import {
  asyncMiddleware,
  authMiddleware,
  roleMiddleware,
  validationMiddleware,
} from '../middleware';
import userController from '../modules/user/user.controller';
import { UserRoles } from '../modules/user/user.types';

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

userRouter.get(
  '/users',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(userController.allUsers.bind(userController)),
);
userRouter.get(
  '/user',
  authMiddleware,
  asyncMiddleware(userController.currentUser.bind(userController)),
);
userRouter.post(
  '/user',
  roleMiddleware(UserRoles.Admin),
  validateNewUser,
  validationMiddleware,
  asyncMiddleware(userController.newUser.bind(userController)),
);
userRouter.put(
  '/user',
  roleMiddleware(UserRoles.Admin),
  validateNewUser,
  validationMiddleware,
  asyncMiddleware(userController.editUser.bind(userController)),
);
userRouter.delete(
  '/user/',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(userController.deleteUser.bind(userController)),
);

export default userRouter;
