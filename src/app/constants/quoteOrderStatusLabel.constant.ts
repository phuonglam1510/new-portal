import { OrderStatus } from "../enums/OrderStatus.enum";

export const quoteOrderStatusLabel: { [key: string]: string } = {
  [OrderStatus.DeliveryNotYetDue]: "Chưa đến hạn giao hàng",
  [OrderStatus.DeliveryLate]: "Trễ hàng",
  [OrderStatus.DeliveredWithoutPayment]: "Đã giao hàng chưa thanh toán",
  [OrderStatus.DeliveredPartiallyPaid]: "Đã giao hàng thanh toán 1 phần",
  [OrderStatus.CompletePayment]: "Hoàn tất thanh toán",
};
