import { Schema, model } from 'mongoose';

import type { IUserModel } from '../types';

const UserSchema = new Schema<IUserModel>({
  role: { type: String, ref: 'Role' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  gender: { type: String, required: false },
  status: { type: String, required: true, default: 'active' },
});

const User = model<IUserModel>('User', UserSchema);

export default User;
