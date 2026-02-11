import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import type { IAuthenticatedRequest } from '../../common/types/auth.types';
import {
  type ICreateUserData,
  type IResponseShortUser,
  type IResponseUser,
  type IUpdateUserData,
  UserRoles,
} from './user.types';
import userService from './user.service';
import { RequiredRole } from '../../common/decorators/required-role.decorator';
import AuthGuard from '../../common/guards/auth.guard';
import RoleGuard from '../../common/guards/role.guard';

const VALIDATION_ERROR_USERNAME = 'Логин должен быть от 4 до 20 символов';
const VALIDATION_ERROR_PASSWORD = 'Пароль должен быть от 6 до 20 символов';
const VALIDATION_ERROR_FIRSTNAME = 'Имя должно содержать не менее 1 символа';
const VALIDATION_ERROR_LASTNAME = 'Фамилия должна содержать не менее 1 символа';

const throwValidationError = (message: string): never => {
  throw new HttpError(
    ERROR_PRESETS.validationError.statusCode,
    message,
    ERROR_PRESETS.validationError.errorType,
  );
};

const validateNewUser = (payload: ICreateUserData | IUpdateUserData): void => {
  if (!payload.username || payload.username.length < 4 || payload.username.length > 20) {
    throwValidationError(VALIDATION_ERROR_USERNAME);
  }

  if (!payload.password || payload.password.length < 6 || payload.password.length > 20) {
    throwValidationError(VALIDATION_ERROR_PASSWORD);
  }

  if (!payload.firstName || payload.firstName.length < 1) {
    throwValidationError(VALIDATION_ERROR_FIRSTNAME);
  }

  if (!payload.lastName || payload.lastName.length < 1) {
    throwValidationError(VALIDATION_ERROR_LASTNAME);
  }
};

@Controller('data')
@UseGuards(RoleGuard)
export default class UserController {
  @Get('users')
  @RequiredRole(UserRoles.Admin)
  async allUsers(): Promise<IResponseUser[]> {
    return userService.getAllUsers();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @Req() request: IAuthenticatedRequest,
    @Query('username') username?: string,
  ): Promise<IResponseShortUser> {
    return userService.getCurrentUser(request.user, username);
  }

  @Post('user')
  @RequiredRole(UserRoles.Admin)
  async newUser(@Body() payload: ICreateUserData): Promise<IResponseUser[]> {
    validateNewUser(payload);
    return userService.createUser(payload);
  }

  @Put('user')
  @RequiredRole(UserRoles.Admin)
  async editUser(
    @Req() request: IAuthenticatedRequest,
    @Query('username') username: string | undefined,
    @Body() payload: IUpdateUserData,
  ): Promise<IResponseUser[]> {
    validateNewUser(payload);
    return userService.updateUser(request.user, username, payload);
  }

  @Delete('user')
  @RequiredRole(UserRoles.Admin)
  async deleteUser(
    @Req() request: IAuthenticatedRequest,
    @Query('username') username: string | undefined,
  ): Promise<IResponseUser[]> {
    return userService.deleteUser(request.user, username);
  }
}
