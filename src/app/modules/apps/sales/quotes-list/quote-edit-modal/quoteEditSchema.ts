import * as Yup from "yup";

export const quoteEditSchema = Yup.object().shape({
  asking_price_model: Yup.string().required("Vui lòng nhập Model hỏi giá"),
  manufacturer: Yup.string().required("Vui lòng nhập"),
  unit: Yup.string().required("Vui lòng nhập"),
  net_unit_price_no_vat: Yup.number().typeError("Chỉ nhập số").nullable(),
  quantity: Yup.number().typeError("Chỉ nhập số").nullable(),
  commission: Yup.number().typeError("Chỉ nhập số").nullable(),
  vat: Yup.number().typeError("Chỉ nhập số").nullable(),
  corporate_tax: Yup.number()
    .min(20, "Thuế TNDN chỉ từ 20 đến 25%")
    .max(25, "Thuế TNDN chỉ từ 20 đến 25%")
    .typeError("Chỉ nhập số")
    .nullable(),
});
