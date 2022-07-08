import { FileUploadResponse } from "../../../../../models/core/FileUploadResponse.type";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteWarrantyModel } from "../../../../../models/sales/QuoteWarranty.model";

export class QuoteDetailModel extends QuoteModel {
  quote_info?: QuoteInfoModel;
  quote_items: QuoteItemModel[] = [];
  quote_term?: string;
  sale_signature?: FileUploadResponse;
  order_confirmation?: FileUploadResponse;
  head_signature?: FileUploadResponse;
  quote_warranty: QuoteWarrantyModel[] = [];
  quote_attachments: {
    attachment: FileUploadResponse;
    attachment_id: number;
    id: number;
    quote_id: number;
  }[] = [];
}
