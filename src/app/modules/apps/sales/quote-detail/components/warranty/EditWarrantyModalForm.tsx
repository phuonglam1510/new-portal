import React, { useState } from "react";
import { useFormik } from "formik";
import { Builder } from "builder-pattern";
import { QuoteWarrantyModel } from "../../../../../../models/sales/QuoteWarranty.model";
import { FormInput } from "../../../../../../components/FormInput";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { UsersListLoading } from "../../../quotes-list/components/loading/UsersListLoading";
import { quoteSchema } from "./quoteSchema";
import { FormDropdown } from "../../../../../../components/FormDropdown";
import { QuoteWarrantyStatus } from "../../../../../../enums/QuoteWarrantyStatus.enum";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";

type Props = {
  onClose: () => any;
  item: QuoteWarrantyModel;
};

const statusItems = [
  { text: "Chờ xử lý", value: QuoteWarrantyStatus.Pending },
  { text: "Đã xong", value: QuoteWarrantyStatus.Done },
];

const EditWarrantyModalForm: React.FC<Props> = ({ onClose, item }) => {
  const { loading, createQuoteWarranty, editQuoteWarranty } =
    useQuoteActionContext();
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const [quoteForEdit] = useState<QuoteWarrantyModel>(
    Builder(QuoteWarrantyModel, { ...item }).build()
  );

  const formik = useFormik({
    initialValues: quoteForEdit,
    validationSchema: quoteSchema,
    onSubmit: async (values) => {
      if (item.id) {
        editQuoteWarranty(quote.id || 0, values).then(() => {
          loadQuoteDetail(quote.id?.toString() || "");
          onClose();
        });
      } else {
        createQuoteWarranty(quote.id || 0, values).then(() => {
          loadQuoteDetail(quote.id?.toString() || "");
          onClose();
        });
      }
    },
  });

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
            name="time_start_warranty"
            label="Thời gian tiếp nhận bảo hành"
          />
          <FormInput
            formik={formik as any}
            name="issue"
            label="Tình trạng"
            optional
          />
          <FormInput
            formik={formik as any}
            name="technical_in_charge"
            label="Kỹ thuật phụ trách"
            optional
          />
          <FormInput
            formik={formik as any}
            name="errors"
            label="Lỗi"
            optional
          />
          <FormInput
            formik={formik as any}
            name="warranty_process_time"
            label="Thời gian xử lý bảo hành"
            optional
          />
          <FormDropdown
            items={statusItems}
            formik={formik as any}
            name="status"
            label="Trạng thái"
            optional
          />
          <FormInput
            formik={formik as any}
            name="cost_incurred"
            label="Phí phát sinh"
            hasNumberHint
            optional
          />
          <FormInput
            formik={formik as any}
            name="notes"
            label="Ghi Chú"
            optional
          />
        </div>

        <div className="text-center pt-7">
          <button
            type="reset"
            onClick={onClose}
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
              {false ? "Cập nhật" : "Tạo"}
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

export { EditWarrantyModalForm };
