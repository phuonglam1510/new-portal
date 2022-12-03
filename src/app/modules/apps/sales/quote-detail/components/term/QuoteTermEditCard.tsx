import React, { useState } from "react";
import { useFormik } from "formik";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";
import { Builder } from "builder-pattern";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../../../enums/Routing.enum";
import { QuoteTermModel } from "../../../../../../models/sales/QuoteTermModel";
import { FormInput } from "../../../../../../components/FormInput";
import { FormDatePicker } from "../../../../../../components/FormDatePicker";
import { FormDropdown } from "../../../../../../components/FormDropdown";
import { paymentQuoteTermOptions } from "../../../../../../constants/paymentQuoteTermOptions.constant";
import { quoteTermConditionOptions, QuoteTermVatOptions } from "../../../../../../constants/quoteTermConditionOptions.constant";

class QuoteTermEditModel extends QuoteTermModel {
  other_payment_term?: string;
}

const QuoteTermEditCard: React.FC = () => {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const navigate = useNavigate();
  const { editQuoteTerm, createQuoteTerm } = useQuoteActionContext();

  const handleEditOrCreate = async (values: QuoteTermEditModel) => {
    if (values.payment_term === "Khác") {
      values.payment_term = values.other_payment_term || values.payment_term;
    }
    if (quote.quote_term) {
      return editQuoteTerm(quote.id || 0, values);
    }
    return createQuoteTerm(quote.id || 0, values);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik<QuoteTermEditModel>({
    initialValues: Builder(QuoteTermEditModel, {
      ...quote.quote_term,
      payment_term: !paymentQuoteTermOptions.includes(
        quote?.quote_term?.payment_term || ""
      )
        ? "Khác"
        : quote?.quote_term?.payment_term,
      other_payment_term: !paymentQuoteTermOptions.includes(
        quote?.quote_term?.payment_term || ""
      )
        ? quote?.quote_term?.payment_term
        : "",
    }).build(),
    onSubmit: (values) => {
      setLoading(true);
      formik.setSubmitting(true);
      handleEditOrCreate(values)
        .then(() => {
          navigate(`/${Routing.SaleQuotes}/${quote.id}/term`);
          loadQuoteDetail(quote.id?.toString() || "");
        })
        .finally(() => {
          setLoading(false);
          formik.setSubmitting(false);
        });
    },
  });

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Điều Khoản & Bảo Hành</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="card-body border-top p-9">
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              <div className="pt-2">
                <FormDatePicker
                  formik={formik as any}
                  name="quote_effect"
                  label="Hiệu lực báo giá"
                  key="quote_effect"
                  optional
                />
                <FormDropdown
                  items={quoteTermConditionOptions.map((opt) => ({
                    value: opt,
                    text: opt,
                  }))}
                  formik={formik as any}
                  name="warranty_condition"
                  label="Thời gian và điều kiện bảo hành"
                  optional
                />
                <FormDropdown
                    items={Object.keys(QuoteTermVatOptions).map((key) => ({
                      // @ts-ignore
                      value: QuoteTermVatOptions[key],
                      text: key,
                    }))}
                    formik={formik as any}
                    name="vat_include"
                    label="Thuế Vat"
                    optional
                />
                <FormInput
                  formik={formik as any}
                  name="trade_condition"
                  label="Ghi chú"
                  optional
                />
                <FormDropdown
                  formik={formik as any}
                  items={paymentQuoteTermOptions.map((opt) => ({
                    value: opt,
                    text: opt,
                  }))}
                  name="payment_term"
                  label="Điều khoản thanh toán"
                  optional
                />
                {formik.values.payment_term === "Khác" && (
                  <FormInput
                    formik={formik as any}
                    name="other_payment_term"
                    label="Nhập điều kiện khác"
                    optional
                  />
                )}
                <FormInput
                  formik={formik as any}
                  name="bank_info"
                  label="Thông tin ngân hàng"
                  optional
                />
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              className="btn btn-light mx-6"
              disabled={loading}
              onClick={() =>
                navigate(`/${Routing.SaleQuotes}/${quote.id}/term`)
              }
            >
              {!loading && "Huỷ bỏ"}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {!loading && "Lưu"}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { QuoteTermEditCard };
