import { UserRole } from "../enums/UserRole.enum";

export const userRoles = [
  {
    text: "Super Admin",
    value: UserRole.SuperAdmin,
    subText: "Toàn quyền trên hệ thống",
  },
  {
    text: "Nhân viên Sale",
    value: UserRole.Sale,
    subText: "Có thể tạo khách hàng và đơn hàng",
  },
  {
    text: "Nhân viên quản lý",
    value: UserRole.Staff,
    subText: "Quản lý dữ liệu",
  },
];
