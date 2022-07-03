import * as Yup from "yup";

export const quoteEditSchema = Yup.object().shape({
  asking_price_model: Yup.string().required("Vui lòng nhập Model hỏi giá"),
  net_unit_price_no_vat: Yup.number().typeError("Chỉ nhập số").nullable(),
  quantity: Yup.number().typeError("Chỉ nhập số").nullable(),
  commission: Yup.number().typeError("Chỉ nhập số").nullable(),
  vat: Yup.number().typeError("Chỉ nhập số").nullable(),
});
