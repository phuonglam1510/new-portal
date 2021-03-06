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

  const {
    quantity,
    net_unit_price_no_vat,
    unit_price_no_vat,
    vat = 8,
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
            label="Model h???i gi??"
          />
          <FormInput
            formik={formik as any}
            name="quotation_model"
            label="Model b??o gi??"
            optional
          />
          <FormInput
            formik={formik as any}
            name="series_number"
            label="S??? series"
            optional
          />
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="manufacturer"
                label="H??ng s???n xu???t"
              />
            </div>
            <div className="w-10px" />
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="origin"
                label="Xu???t x???"
                optional
              />
            </div>
          </div>
          <div className="d-flex flex-stack">
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="unit"
                label="????n v??? t??nh"
              />
            </div>
            <div className="w-10px" />
            <div className="flex-equal">
              <FormInput
                formik={formik as any}
                name="quantity"
                label="S??? l?????ng"
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
            label="G??a g???c"
            optional
            hasNumberHint
          />
          <Input
            label="Th??nh ti???n gi?? g???c"
            disabled
            value={formatMoney(origin_price * quantity)}
          />
          <FormInput
            formik={formik as any}
            name="net_unit_price_no_vat"
            label="????n gi?? net tr?????c VAT"
            optional
            hasNumberHint
          />
          <Input
            label="Th??nh ti???n gi?? net tr?????c VAT"
            disabled
            value={formatMoney(total_net_price_without_vat)}
          />
          <FormInput
            formik={formik as any}
            name="unit_price_no_vat"
            label="????n gi?? b??n tr?????c VAT"
            optional
            hasNumberHint
          />
          <Input
            label="Th??nh ti???n gi?? b??n tr?????c VAT"
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
            label="Th??nh ti???n gi?? b??n sau VAT"
            disabled
            value={formatMoney(total_selling_price_with_vat)}
          />
          <Input label="N??ng" disabled value={formatMoney(delta)} />
          <FormInput
            formik={formik as any}
            name="corporate_tax"
            label="Thu??? TNDN"
            optional
          />
          <Input
            label="N??ng sau tr??? TNDN"
            disabled
            value={formatMoney(deltaMinusTax)}
          />
          <Input
            label="T???ng chi com"
            disabled
            value={formatMoney(finalCommission)}
          />
          <FormInput
            formik={formik as any}
            name="delivery_time"
            label="Th???i gian giao h??ng"
            optional
          />
          <FormInput
            formik={formik as any}
            name="notes"
            label="Ghi Ch??"
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
            Hu???
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={loading || formik.isSubmitting || !formik.touched}
          >
            <span className="indicator-label">
              {itemForUpdate?.id ? "C???p nh???t" : "T???o"}
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
