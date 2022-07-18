import * as Yup from "yup";

export const quoteSchema = Yup.object().shape({
  warranty_process_time: Yup.number().typeError("Chỉ nhập số").nullable(),
  quote_item_id: Yup.number().required("Vui lòng chọn model"),
});
