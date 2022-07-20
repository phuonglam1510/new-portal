import React, { useState } from "react";
import { useFormik } from "formik";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";
import {
  quoteCreationSchemas,
  QuoteFormModel,
} from "../../../quotes-list/new-quote/quoteCreationSchemas";
import { Builder } from "builder-pattern";
import { QuoteOrderInfoStep } from "../../../quotes-list/new-quote/steps/QuoteOrderInfoStep";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../../../enums/Routing.enum";

const QuoteInfoEditCard: React.FC = () => {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const navigate = useNavigate();
  const { editQuoteInfo, createQuoteInfo } = useQuoteActionContext();

  const handleEditOrCreate = async (values: QuoteFormModel) => {
    console.log(quote.quote_info);
    if (quote.quote_info) {
      return editQuoteInfo(quote.id || 0, values.info);
    }
    return createQuoteInfo(values);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik<QuoteFormModel>({
    initialValues: Builder(QuoteFormModel, {
      ...quote,
      info: quote.quote_info,
    }).build(),
    validationSchema: quoteCreationSchemas[2],
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      formik.setSubmitting(true);
      handleEditOrCreate(values)
        .then(() => {
          navigate(`/${Routing.SaleQuotes}/${quote.id}/info`);
          loadQuoteDetail(quote.id?.toString() || "");
        })
        .finally(() => {
          setLoading(false);
          formik.setSubmitting(false);
        });
    },
  });

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
          <h3 className="fw-bolder m-0">Thông tin đơn hàng</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="card-body border-top p-9">
            <QuoteOrderInfoStep formik={formik as any} />
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              type="submit"
              className="btn btn-light mx-6"
              disabled={loading}
            >
              {!loading && "Discard"}
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
              {!loading && "Save Changes"}
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

export { QuoteInfoEditCard };
