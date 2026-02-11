import { Schema, model } from 'mongoose';

import { UserRoles, UserGender, UserStatus, type IUserModel } from './user.types';

const UserSchema = new Schema<IUserModel>({
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    default: UserRoles.Employee,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  gender: {
    type: String,
    enum: Object.values(UserGender),
    required: true,
    default: UserGender.Female,
  },

  status: {
    type: String,
    enum: Object.values(UserStatus),
    required: true,
    default: UserStatus.Active,
  },
});

const User = model<IUserModel>('User', UserSchema);

export default User;
