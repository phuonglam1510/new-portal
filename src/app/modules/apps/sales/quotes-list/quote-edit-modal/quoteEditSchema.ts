import * as Yup from "yup";

export const quoteEditSchema = Yup.object().shape({
  asking_price_model: Yup.string().required("Vui lòng nhập Model hỏi giá"),
  quotation_model: Yup.string().required("Vui lòng nhập Model báo giá"),
  manufacturer: Yup.string().required("Vui lòng nhập Hãng sản xuất"),
  net_unit_price_no_vat: Yup.number()
    .required("Vui lòng nhập đơn giá net")
    .typeError("Chỉ nhập số"),
  quantity: Yup.number()
    .required("Vui lòng nhập số lượng")
    .typeError("Chỉ nhập số"),
  commission: Yup.number()
    .required("Vui lòng nhập commission")
    .typeError("Chỉ nhập số"),
  vat: Yup.number().typeError("Chỉ nhập số"),
});
