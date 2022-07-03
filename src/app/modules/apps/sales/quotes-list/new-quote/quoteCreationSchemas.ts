import { Builder } from "builder-pattern";
import * as Yup from "yup";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";

export class QuoteInfoFormModel extends QuoteInfoModel {
  warranty?: File;
  deliver_record?: File;
}

export class QuoteFormModel extends QuoteModel {
  sale_signature?: File;
  order_confirmation?: File;
  head_signature?: File;
  models: QuoteItemModel[] = [];
  info: QuoteInfoFormModel = new QuoteInfoFormModel();
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
  Yup.object({
    info: Yup.object({
      prepay: Yup.number().max(100, "% trả trước không đc hơn 100%"),
    }),
  }),
];
