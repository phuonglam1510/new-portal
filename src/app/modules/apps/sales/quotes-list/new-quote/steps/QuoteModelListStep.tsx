import React, { useState } from "react";
import { useFormik } from "formik";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { useQuoteModalContext } from "../../core/QuoteModalProvider";
import { FormFieldError } from "../../../../../../components/FormFieldError";
import { QuoteRowItem } from "../../../shared/QuoteRowItem";
import { ModelsImportModal } from "../../../quote-detail/components/models/ModelsImportModal";
import { Builder } from "builder-pattern";
import { QuoteDetailModel } from "../../../quote-detail/core/_models";
import { useQuoteActionContext } from "../../core/QuoteActionProvider";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

let editIndex: number | null = null;

const QuoteModelListStep: React.FC<Props> = ({ formik }) => {
  const { models } = formik.values;
  const { open, close } = useQuoteModalContext();
  const { quote } = useQuoteActionContext();
  const [visible, setVisible] = useState<boolean>(false);

  const onSave = (newItem: QuoteItemModel) => {
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

  const onImportDone = (newModels: QuoteItemModel[]) => {
    formik.setFieldValue("models", [...models, ...newModels]);
  };

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex align-items-center justify-content-between"
        data-kt-user-table-toolbar="base"
      >
        <a className="fw-bolder text-black fs-4">Model báo giá</a>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-light-success m-4"
            onClick={() => setVisible(true)}
          >
            <KTSVG
              path="/media/icons/duotune/arrows/arr076.svg"
              className="svg-icon-2"
            />
            Import
          </button>
          <button type="button" className="btn btn-primary" onClick={onAdd}>
            <KTSVG
              path="/media/icons/duotune/arrows/arr075.svg"
              className="svg-icon-2"
            />
            Thêm
          </button>
        </div>
      </div>

      <div className="table-responsive mt-7">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              <th className="p-2 min-w-120px">Model</th>
              <th className="p-2 min-w-100px">Hãng sản xuất</th>
              <th className="p-2 min-w-100px">Inter</th>
              <th className="p-2 min-w-110px">Số lượng</th>
              <th className="p-2 min-w-50px">Đơn giá</th>
              <th className="p-2 min-w-50px">Thành tiền (VAT)</th>
              <th className="p-2 min-w-50px">VAT (%)</th>
              <th className="p-2 min-w-50px">Commision (%)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold">
            {models.map((item: QuoteItemModel, index: number) => (
              <QuoteRowItem
                key={item.asking_price_model}
                item={models[index]}
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
      {visible && (
        <ModelsImportModal
          onClose={() => setVisible(false)}
          onDone={onImportDone}
          quote={Builder(QuoteDetailModel, { id: quote?.id }).build()}
        />
      )}
    </div>
  );
};

export { QuoteModelListStep };
