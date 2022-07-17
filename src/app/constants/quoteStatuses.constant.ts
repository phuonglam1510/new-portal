import { QuoteStatus } from "../enums/QuoteStatus.enum";

export const quoteStatuses = [
  { text: "Chờ báo giá", value: QuoteStatus.Wating },
  { text: "Đã báo giá", value: QuoteStatus.Quoted },
];
