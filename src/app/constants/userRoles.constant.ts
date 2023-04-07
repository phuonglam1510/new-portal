import { UserRole } from "../enums/UserRole.enum";

export const userRoles = [
  {
    text: "Admin",
    value: UserRole.SuperAdmin,
    subText: "Toàn quyền trên hệ thống",
  },
  {
    text: "Nhân viên sale",
    value: UserRole.Sale,
    subText: "Có thể tạo khách hàng và đơn hàng",
  },
  {
    text: "Quản lý",
    value: UserRole.Staff,
    subText: "Quản lý dữ liệu",
  },
  {
    text: "Quan sát viên",
    value: UserRole.Monitor,
    subText: "Có thể xem một số dữ liệu nhất dịnh",
  },
];
