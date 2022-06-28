import React from "react";
import { useFormik } from "formik";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { useQuoteModalContext } from "../../core/QuoteModalProvider";
import { FormFieldError } from "../../../../../../components/FormFieldError";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

interface ItemProps {
  formik: ReturnType<typeof useFormik>;
  index: number;
  onEdit: () => any;
  onRemove: () => any;
}

const QuoteItem: React.FC<ItemProps> = ({
  formik,
  index,
  onEdit,
  onRemove,
}) => {
  const {
    asking_price_model,
    quotation_model,
    manufacturer,
    unit,
    quantity,
    net_unit_price_no_vat,
    vat,
    commission,
  } = (formik.values.models[index] || {}) as QuoteItemModel;
  return (
    <tr>
      <td>
        <a
          href="#"
          className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
        >
          {asking_price_model}
        </a>
        <span className="text-muted fw-bold d-block">{quotation_model}</span>
      </td>
      <td className="text-muted fw-bold">{manufacturer}</td>
      <td className="text-muted fw-bold">
        {quantity} x {unit}
      </td>
      <td className="text-end fw-bold">{net_unit_price_no_vat}</td>
      <td className="text-end fw-bold">{commission}</td>
      <td className="text-end fw-bold">{vat}</td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            onClick={onEdit}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTSVG
              path="/media/icons/duotune/art/art005.svg"
              className="svg-icon-3"
            />
          </a>
          <a
            onClick={onRemove}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
          >
            <KTSVG
              path="/media/icons/duotune/general/gen027.svg"
              className="svg-icon-3"
            />
          </a>
        </div>
      </td>
    </tr>
  );
};

let editIndex: number | null = null;

const QuoteModelListStep: React.FC<Props> = ({ formik }) => {
  const { models } = formik.values;
  const { open, close } = useQuoteModalContext();

  const onSave = (newItem: QuoteItemModel) => {
    console.log(newItem);
    if (editIndex !== null) {
      formik.setFieldValue(
        "models",
        models.map((item: QuoteItemModel, index: number) => {
          if (index === editIndex) {
            return newItem;
          }
          return item;
        }),
        true
      );
    } else {
      formik.setFieldValue("models", [...models, newItem], true);
    }
    editIndex = null;
    close();
  };

  const onAdd = () => {
    open(new QuoteItemModel(), onSave);
  };

  const onEdit = (index: number) => {
    const item = models[index];
    editIndex = index;
    open(item, onSave);
  };

  const onRemove = (index: number) => {
    formik.setFieldValue(
      "models",
      models.filter((_: any, ind: number) => index !== ind)
    );
  };

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex align-items-center justify-content-between"
        data-kt-user-table-toolbar="base"
      >
        <a className="fw-bolder text-black fs-4">Model báo giá</a>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <KTSVG
            path="/media/icons/duotune/arrows/arr075.svg"
            className="svg-icon-2"
          />
          Thêm
        </button>
      </div>

      <div className="table-responsive mt-7">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              <th className="p-0 min-w-120px">Model</th>
              <th className="p-0 min-w-100px">Hãng sản xuất</th>
              <th className="p-0 min-w-110px">Số lượng</th>
              <th className="p-0 min-w-50px">Đơn giá</th>
              <th className="p-0 min-w-50px">Commision (%)</th>
              <th className="p-0 min-w-50px">VAT (%)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold">
            {models.map((item: QuoteItemModel, index: number) => (
              <QuoteItem
                key={item.asking_price_model}
                formik={formik}
                index={index}
                onRemove={() => onRemove(index)}
                onEdit={() => onEdit(index)}
              />
            ))}
          </tbody>
        </table>
        {models.length === 0 && (
          <div className="text-gray-500 fw-bold fs-4 w-100 pt-10 text-center">
            Chọn "Thêm" để tạo model báo giá
          </div>
        )}
        <FormFieldError formik={formik} name="models" />
      </div>
    </div>
  );
};

export { QuoteModelListStep };
