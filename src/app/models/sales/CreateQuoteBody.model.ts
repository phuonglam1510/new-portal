import { QuoteModel } from "./Quote.model";

export type CreateQuoteBody = Pick<
  QuoteModel,
  | "contact_id"
  | "type"
  | "delivery_address"
  | "package_quality"
  | "sale_signature_id"
  | "order_confirmation_id"
  | "head_signature_id"
  | "deliver_record_id"
  | "status"
>;
