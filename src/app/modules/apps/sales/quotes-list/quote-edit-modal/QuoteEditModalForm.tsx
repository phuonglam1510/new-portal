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
import { FormDatePicker } from "../../../../../components/FormDatePicker";
import { FormCheckbox } from "../../../../../components/FormCheckbox";

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

  const {
    quantity,
    net_unit_price_no_vat,
    unit_price_no_vat,
    vat = 10,
    corporate_tax = 20,
    commission = 10,
    origin_price = 0,
  } = formik.values;
  const total_net_price_without_vat = quantity * (net_unit_price_no_vat || 0);
  const total_selling_price_without_vat = quantity * (unit_price_no_vat || 0);
  const total_selling_price_with_vat =
    total_selling_price_without_vat * (vat / 100 + 1);

  const delta = total_selling_price_without_vat - total_net_price_without_vat;
  const deltaMinusTax = delta - (corporate_tax / 100) * delta;
  const finalCommission =
    deltaMinusTax + (commission / 100) * total_net_price_without_vat;

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
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="manufacturer"
                label="Hãng sản xuất"
              />
            </div>
            <div className="w-10px" />
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="origin"
                label="Xuất xứ"
                optional
              />
            </div>
          </div>
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="unit"
                label="Đơn vị tính"
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
            name="origin_price"
            label="Gía gốc"
            optional
            hasNumberHint
          />
          <Input
            label="Thành tiền giá gốc"
            disabled
            value={formatMoney(origin_price * quantity)}
          />
          <FormInput
            formik={formik as any}
            name="net_unit_price_no_vat"
            label="Đơn giá net trước VAT (Bao gồm COM)"
            optional
            hasNumberHint
          />
          <Input
            label="Thành tiền giá net trước VAT (Bao gồm COM)"
            disabled
            value={formatMoney(total_net_price_without_vat)}
          />
          <FormInput
            formik={formik as any}
            name="unit_price_no_vat"
            label="Đơn giá bán trước VAT"
            optional
            hasNumberHint
          />
          <Input
            label="Thành tiền giá bán trước VAT"
            disabled
            value={formatMoney(total_selling_price_without_vat)}
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
          <Input
            label="Thành tiền giá bán sau VAT"
            disabled
            value={formatMoney(total_selling_price_with_vat)}
          />
          <Input label="Nâng" disabled value={formatMoney(delta)} />
          <FormInput
            formik={formik as any}
            name="corporate_tax"
            label="Thuế TNDN"
            optional
          />
          <Input
            label="Nâng sau trừ TNDN"
            disabled
            value={formatMoney(deltaMinusTax)}
          />
          <Input
            label="Tổng chi com"
            disabled
            value={formatMoney(finalCommission)}
          />
          <FormInput
            formik={formik as any}
            name="delivery_time"
            label="Thời gian dự kiến giao hàng"
            optional
          />
          <FormInput
            formik={formik as any}
            name="notes"
            label="Ghi Chú"
            optional
          />
          <FormDatePicker
            key="delivery_date"
            formik={formik as any}
            name="delivery_date"
            label="Ngày giao hàng"
            optional
          />
          <FormCheckbox
            formik={formik as any}
            name="delivery_status"
            label="Đã giao"
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
