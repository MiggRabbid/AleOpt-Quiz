// backend/src/models/User.ts
import { Schema, model, Document } from 'mongoose';
import { iRoleModel } from './Role';

export interface iUserModel extends Document {
  _id?: string;
  role: string | iRoleModel;
  name: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<iUserModel>({
  role: { type: String, ref: 'Role' },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model<iUserModel>('User', UserSchema);

export default User;
