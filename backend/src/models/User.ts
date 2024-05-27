// backend/src/models/User.ts
import { Schema, model, Document } from 'mongoose';
import { iRoleModel } from './Role';

interface UserModel extends Document {
  role: string | iRoleModel;
  name: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<UserModel>({
  role: { type: String, ref: 'Role' },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model<UserModel>('User', UserSchema);

export default User;
