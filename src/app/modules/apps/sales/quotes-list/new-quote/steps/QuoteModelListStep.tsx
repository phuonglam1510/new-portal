import React, { useState } from "react";
import { useFormik } from "formik";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { useQuoteModalContext } from "../../core/QuoteModalProvider";
import { FormFieldError } from "../../../../../../components/FormFieldError";
import { ModelsImportModal } from "../../../quote-detail/components/models/ModelsImportModal";
import { Builder } from "builder-pattern";
import { QuoteDetailModel } from "../../../quote-detail/core/_models";
import { useQuoteActionContext } from "../../core/QuoteActionProvider";
import { ModelsTable } from "../../../quote-detail/components/models/ModelsTable";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

let editIndex: number | null = null;

const QuoteModelListStep: React.FC<Props> = ({ formik }) => {
  const { models } = formik.values;
  const { open, close, setLoading } = useQuoteModalContext();
  const { quote, editQuoteItem, createQuoteItem, removeQuoteItem } =
    useQuoteActionContext();
  const [visible, setVisible] = useState<boolean>(false);
  const quoteForTable = React.useMemo(
    () => Builder(QuoteModel, { id: quote?.id, quote_items: models }).build(),
    [quote, models]
  );

  const onSave = async (newItem: QuoteItemModel) => {
    setLoading(true);
    let savedItem: any = false;
    if (editIndex !== null) {
      savedItem = await editQuoteItem(quote?.id || 0, newItem);
    } else {
      savedItem = await createQuoteItem(quote?.id || 0, newItem);
    }
    setLoading(false);
    if (savedItem) {
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
        console.log("new", savedItem);
        formik.setFieldValue("models", [...models, savedItem], true);
      }
      editIndex = null;
      close();
    }
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
    const item = models[index];

    removeQuoteItem(quote?.id || 0, item.id).then(() => {
      formik.setFieldValue(
        "models",
        models.filter((_: any, ind: number) => index !== ind)
      );
    });
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

      {quote && (
        <ModelsTable
          quote={quoteForTable}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      )}
      <FormFieldError formik={formik} name="models" />
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
