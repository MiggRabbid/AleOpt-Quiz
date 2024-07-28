// backend/src/models/Role.ts
import { Schema, model } from 'mongoose';

import { iRoleModel, UserRoles } from '../types/userTypes';

const RoleSchema = new Schema<iRoleModel>({
  value: { type: String, unique: true, default: UserRoles.Employee },
});

const Role = model<iRoleModel>('Role', RoleSchema);

export default Role;
