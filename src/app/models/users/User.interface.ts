import { UserGroup } from "../../enums/UserGroup.enum";
import { UserRole } from "../../enums/UserRole.enum";
import { UserStatus } from "../../enums/UserStatus.enum";
import { FileUploadResponse } from "../core/FileUploadResponse.type";
import { ID } from "../core/ID.type";

export class User {
  id?: ID;
  name?: string;
  avatar?: FileUploadResponse;
  avatarForEdit?: string | File;
  avatar_id?: number;
  email?: string;
  phone?: string;
  position?: string;
  role?: UserRole;
  status: UserStatus = UserStatus.Active;
  last_login?: string;
  two_steps?: boolean;
  created_at?: string;
  online?: boolean;
  password?: string;
  group: UserGroup = UserGroup.Group1;
  initials?: {
    label: string;
    state: string;
  };

  public get roleName(): string {
    if (this.role === UserRole.SuperAdmin) {
      return "Admin";
    }
    if (this.role === UserRole.Sale) {
      return "Sale";
    }
    if (this.role === UserRole.Staff) {
      return "Manager"
    }
    return "Monitor";
  }

  public get joinAt(): string {
    return this.created_at
      ? new Date(this.created_at).toDateString()
      : "Unknown";
  }

  public get avatarUrl(): string {
    return this.avatar?.file_url || "";
  }

  public get groupText(): string {
    return "Nhóm " + this.group;
  }
}
