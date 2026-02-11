import bcrypt from 'bcryptjs';

import { ERROR_PRESETS } from '../../config/error.config';
import { HttpError } from '../../errors/http-error';
import type { IAuthUserPayload } from '../../middleware/types';
import { canAccessUsername, hasElevatedRole } from '../../utils/access';
import { getUserStats, sortUsersByRole } from '../../utils';
import Results from '../result/result.model';
import Role from './role.model';
import User from './user.model';
import {
  UserStatus,
  type ICreateUserData,
  type IResponseShortUser,
  type IResponseUser,
  type IUpdateUserData,
} from './user.types';

class UserService {
  private async prepareUsersWithStats(): Promise<IResponseUser[]> {
    const [users, results] = await Promise.all([User.find(), Results.find()]);

    const resultsByUsername = new Map(results.map((result) => [result.username, result]));

    const preparedUsers = users.map((user) => {
      const currentUser: IResponseUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        image: user.image ?? '',
        gender: user.gender,
        status: user.status,
        numberAttempts: 0,
        lastResult: null,
      };

      const userResults = resultsByUsername.get(user.username);
      if (userResults && userResults.attempts.length > 0) {
        const stats = getUserStats(userResults);
        const latestAttempt = stats.attempts[0];
        const latestPercent = Math.floor(
          (latestAttempt.correctAnswers / latestAttempt.answers.length) * 100,
        );

        currentUser.lastResult = latestPercent;
        currentUser.numberAttempts = stats.numberAttempts;
      }

      return currentUser;
    });

    return sortUsersByRole(preparedUsers);
  }

  async getAllUsers(): Promise<IResponseUser[]> {
    return this.prepareUsersWithStats();
  }

  async getCurrentUser(
    actor: IAuthUserPayload | undefined,
    username: string | undefined,
  ): Promise<IResponseShortUser> {
    const targetUsername = username ?? actor?.username;
    if (!targetUsername) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    if (!canAccessUsername(actor, targetUsername)) {
      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }

    const user = await User.findOne({ username: targetUsername });
    if (!user) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    return {
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image ?? '',
      gender: user.gender,
      status: user.status,
    };
  }

  async createUser(data: ICreateUserData): Promise<IResponseUser[]> {
    const candidate = await User.findOne({ username: data.username });
    if (candidate) {
      throw new HttpError(
        ERROR_PRESETS.userAlreadyExists.statusCode,
        ERROR_PRESETS.userAlreadyExists.message,
        ERROR_PRESETS.userAlreadyExists.errorType,
      );
    }

    const hashPassword = bcrypt.hashSync(data.password, 5);
    const role = await Role.findOne({ value: data.role });

    const newUser = new User({
      ...data,
      role: role?.value ?? data.role,
      password: hashPassword,
      status: UserStatus.Active,
    });
    await newUser.save();

    return this.prepareUsersWithStats();
  }

  async updateUser(
    actor: IAuthUserPayload | undefined,
    targetUsername: string | undefined,
    payload: IUpdateUserData,
  ): Promise<IResponseUser[]> {
    if (!targetUsername) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    if (!actor || !hasElevatedRole(actor.role)) {
      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }

    const updateData: IUpdateUserData = {
      role: payload.role,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      status: payload.status,
    };

    if (payload.password && payload.password.length > 0) {
      updateData.password = bcrypt.hashSync(payload.password, 5);
    }

    const updatedUser = await User.findOneAndUpdate({ username: targetUsername }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    return this.prepareUsersWithStats();
  }

  async deleteUser(
    actor: IAuthUserPayload | undefined,
    targetUsername: string | undefined,
  ): Promise<IResponseUser[]> {
    if (!targetUsername) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    if (!actor || !hasElevatedRole(actor.role)) {
      throw new HttpError(
        ERROR_PRESETS.accessDenied.statusCode,
        ERROR_PRESETS.accessDenied.message,
        ERROR_PRESETS.accessDenied.errorType,
      );
    }

    const deletedUser = await User.findOneAndDelete({ username: targetUsername });
    if (!deletedUser) {
      throw new HttpError(
        ERROR_PRESETS.userNotFoundGeneric.statusCode,
        ERROR_PRESETS.userNotFoundGeneric.message,
        ERROR_PRESETS.userNotFoundGeneric.errorType,
      );
    }

    return this.prepareUsersWithStats();
  }
}

export default new UserService();
