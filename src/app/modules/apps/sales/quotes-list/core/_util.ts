import { QuoteFormModel } from "../new-quote/quoteCreationSchemas";

export const pickBody = ({
  contact_id,
  type,
  delivery_address,
  package_quality,
  sale_signature_id,
  order_confirmation_id,
  head_signature_id,
  deliver_record_id,
  status,
}: QuoteFormModel) => ({
  contact_id,
  type,
  delivery_address,
  package_quality,
  sale_signature_id,
  order_confirmation_id,
  head_signature_id,
  deliver_record_id,
  status,
});

export const fileKeyMap: {
  [key: string]:
    | "sale_signature_id"
    | "head_signature_id"
    | "order_confirmation_id";
} = {
  sale_signature: "sale_signature_id",
  order_confirmation: "order_confirmation_id",
  head_signature: "head_signature_id",
};
