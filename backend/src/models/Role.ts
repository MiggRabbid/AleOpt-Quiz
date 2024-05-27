// backend/src/models/Role.ts
import { Schema, model, Document } from "mongoose";

interface iRoleModel extends Document {
  value: string;
}

const RoleSchema = new Schema<iRoleModel>({
  value: { type: String, unique: true, default: "USER" },
});

const Role = model<iRoleModel>("Role", RoleSchema);

export { iRoleModel };
export default Role;
