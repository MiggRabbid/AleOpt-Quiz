// backend/src/models/Role.ts
import { Schema, model, Document } from "mongoose";

export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

interface iRoleModel extends Document {
  value: UserRoles;
}

const RoleSchema = new Schema<iRoleModel>({
  value: { type: String, unique: true, default: UserRoles.Employee },
});

const Role = model<iRoleModel>("Role", RoleSchema);

export { iRoleModel };
export default Role;
