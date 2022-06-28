import { Builder } from "builder-pattern";
import * as Yup from "yup";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";

export class QuoteFormModel extends QuoteModel {
  sale_signature?: File;
  order_confirmation?: File;
  head_signature?: File;
  models: QuoteItemModel[] = [];
}

export const quoteCreationSchemas = [
  Yup.object({
    contact_id: Yup.number()
      .required("Vui lòng chọn người liên hệ")
      .label("Contact"),
    status: Yup.string().required("Vui lòng chọn trạng thái"),
  }),
  Yup.object({
    models: Yup.array().min(1, "Vui lòng tạo ít nhất một báo giá"),
  }),
  Yup.object({}),
];
