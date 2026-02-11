// backend/src/models/Role.ts
import { Schema, model } from 'mongoose';

import { UserRoles } from './user.types';
import type { IRoleModel } from './user.types';

const RoleSchema = new Schema<IRoleModel>({
  value: { type: String, unique: true, default: UserRoles.Employee },
});

const Role = model<IRoleModel>('Role', RoleSchema);

export default Role;
