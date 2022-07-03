import React, { useState } from "react";
import { useFormik } from "formik";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { FormInput } from "../../../../../components/FormInput";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { Input } from "../../../../../components/Input";
import { quoteEditSchema } from "./quoteEditSchema";
import { useQuoteModalContext } from "../core/QuoteModalProvider";
import { Builder } from "builder-pattern";
import { formatMoney } from "../../../../../helpers/Number.helper";

type Props = {
  onSave: (item: QuoteItemModel) => any;
};

const QuoteEditModalForm: React.FC<Props> = ({ onSave }) => {
  const { close, itemForUpdate, loading } = useQuoteModalContext();

  const [quoteForEdit] = useState<QuoteItemModel>(
    Builder(QuoteItemModel, { ...itemForUpdate }).build()
  );

  const formik = useFormik({
    initialValues: quoteForEdit,
    validationSchema: quoteEditSchema,
    onSubmit: async (values) => {
      onSave(values);
    },
  });

  const { quantity, net_unit_price_no_vat } = formik.values;

  console.log(formik);

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column scroll-y me-n3 pe-5"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <FormInput
            formik={formik as any}
            name="asking_price_model"
            label="Model hỏi giá"
          />
          <FormInput
            formik={formik as any}
            name="quotation_model"
            label="Model báo giá"
            optional
          />
          <FormInput
            formik={formik as any}
            name="series_number"
            label="Số series"
            optional
          />
          <FormInput
            formik={formik as any}
            name="manufacturer"
            label="Hãng sản xuất"
            optional
          />
          <FormInput
            formik={formik as any}
            name="origin"
            label="Xuất xứ"
            optional
          />
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="unit"
                label="Đơn vị tính"
                optional
              />
            </div>
            <div className="w-10px" />
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="quantity"
                label="Số lượng"
                optional
              />
            </div>
          </div>
          <FormInput
            formik={formik as any}
            name="inter"
            label="Inter"
            optional
          />
          <FormInput
            formik={formik as any}
            name="net_unit_price_no_vat"
            label="Đơn giá net không có VAT"
            optional
            hasNumberHint
          />
          <Input
            label="Thành tiền giá net không có VAT"
            disabled
            value={formatMoney(quantity * (net_unit_price_no_vat || 0))}
          />
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="commission"
                label="Commission (%)"
                optional
              />
            </div>
            <div className="w-10px" />
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="vat"
                label="VAT (%)"
                optional
              />
            </div>
          </div>
          <FormInput
            formik={formik as any}
            name="delivery_time"
            label="Thời gian giao hàng"
            optional
          />
          <FormInput
            formik={formik as any}
            name="notes"
            label="Ghi Chú"
            optional
          />
        </div>

        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={close}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || loading}
          >
            Huỷ
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={loading || formik.isSubmitting || !formik.touched}
          >
            <span className="indicator-label">
              {itemForUpdate?.id ? "Cập nhật" : "Tạo"}
            </span>
            {(formik.isSubmitting || loading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || loading) && <UsersListLoading />}
    </>
  );
};

export { QuoteEditModalForm };
