import { Schema, model } from 'mongoose';

import { iUserModel } from '../types/userTypes';

const UserSchema = new Schema<iUserModel>({
  role: { type: String, ref: 'Role' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model<iUserModel>('User', UserSchema);

export default User;
