import { FileUploadResponse } from "../../../../../models/core/FileUploadResponse.type";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";

export class QuoteDetailModel extends QuoteModel {
  quote_info?: QuoteInfoModel;
  quote_items: QuoteItemModel[] = [];
  quote_term?: string;
  quote_warranty: any[] = [];
  sale_signature?: FileUploadResponse;
  order_confirmation?: FileUploadResponse;
  head_signature?: FileUploadResponse;
}
