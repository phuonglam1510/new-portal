import React from "react";
import { useFormik } from "formik";
import { FormDropdown } from "../../../../../../components/FormDropdown";
import { FormInput } from "../../../../../../components/FormInput";
import { FormFileUploader } from "../../../../../../components/FormFileUploader";
import { quoteOrderStatusLabel } from "../../../../../../constants/quoteOrderStatusLabel.constant";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

const orderStatuses = Object.keys(quoteOrderStatusLabel).map((key) => ({
  text: quoteOrderStatusLabel[key],
  value: key,
}));

const QuoteOrderInfoStep: React.FC<Props> = ({ formik }) => {
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <div className="pt-2">
        <FormInput formik={formik as any} name="info.po_number" label="Số PO" />
        <FormDropdown
          formik={formik as any}
          name="info.status"
          items={orderStatuses}
          label="Trạng thái đơn hàng"
        />
        <FormInput
          formik={formik as any}
          name="info.bill_date"
          label="Ngày giao hàng"
          optional
        />
        <FormInput
          formik={formik as any}
          name="info.delivery_date"
          label="Ngày hoá đơn"
          optional
        />
        <FormInput
          formik={formik as any}
          name="info.prepay"
          label="Trả trước (%)"
          optional
        />
        <FormInput
          formik={formik as any}
          name="info.invoice_number"
          label="Số hoá đơn"
          optional
        />
        <FormInput
          formik={formik as any}
          name="info.delivery_lading_number"
          label="Số vận đơn giao hàng"
          optional
        />
        <FormInput
          formik={formik as any}
          name="info.extra_cost"
          label="Chi phí vận chuyển, phụ phí phát sinh"
          optional
          hasNumberHint
        />
        <FormFileUploader
          formik={formik as any}
          name="info.warranty_id"
          label="Giấy bảo hành"
        />
        <FormFileUploader
          formik={formik as any}
          name="info.deliver_record_id"
          label="Biên bản giao hàng"
        />
        <FormInput
          formik={formik as any}
          name="info.notes"
          label="Ghi chú"
          optional
        />
      </div>
    </div>
  );
};

export { QuoteOrderInfoStep };
