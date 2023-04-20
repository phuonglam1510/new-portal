import {QuoteStatus} from "../enums/QuoteStatus.enum";

export const quoteStatuses = [
  { text: "Chờ báo giá", value: QuoteStatus.Wating },
  { text: "Đã báo giá", value: QuoteStatus.Quoted },
  { text: "Bán Hàng", value: QuoteStatus.Sold },
  { text: "Không thể báo giá", value: QuoteStatus.UNPRICEABLE }
];

export function getQuoteStatusLabel(status: string | number) {
    // @ts-ignore
    return QuoteStatus[status];
}