import { Schema, model, Document } from 'mongoose';
import { iRoleModel } from './Role';

export interface iUserModel extends Document {
  _id?: string;
  role: string | iRoleModel;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  results?: Array<Record<string, string>>
}

const UserSchema = new Schema<iUserModel>({
  role: { type: String, ref: 'Role' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model<iUserModel>('User', UserSchema);

export default User;
