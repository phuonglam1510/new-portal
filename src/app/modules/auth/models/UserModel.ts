import { UserRole } from "../../../enums/UserRole.enum";
import { UserStatus } from "../../../enums/UserStatus.enum";
import { FileUploadResponse } from "../../../models/core/FileUploadResponse.type";

export class UserModel {
  id!: number;
  name!: string;
  password!: string | undefined;
  email!: string;
  avatar_id!: number;
  status!: UserStatus;
  role!: UserRole;
  force_change_password!: 0 | 1;
  created_at!: string;
  updated_at!: string;
  avatar!: FileUploadResponse;

  group!: number;
  phone!: string;
  position!: string;

  public get roleName(): string {
    if (this.role === UserRole.SuperAdmin) {
      return "Admin";
    }
    if (this.role === UserRole.Sale) {
      return "Sale";
    }
    return "Nhân viên";
  }

  public get joinAt(): string {
    return this.created_at
      ? new Date(this.created_at).toDateString()
      : "Unknown";
  }
}
