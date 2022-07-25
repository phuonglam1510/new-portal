import React, { useState } from "react";
import { useFormik } from "formik";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";
import {
  quoteCreationSchemas,
  QuoteFormModel,
} from "../../../quotes-list/new-quote/quoteCreationSchemas";
import { Builder } from "builder-pattern";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../../../enums/Routing.enum";
import { QuoteInfoStep } from "../../../quotes-list/new-quote/steps/QuoteInfoStep";

const QuoteOverviewEditCard: React.FC = () => {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const navigate = useNavigate();
  const { editQuote } = useQuoteActionContext();

  const [loading, setLoading] = useState(false);
  const formik = useFormik<QuoteFormModel>({
    initialValues: Builder(QuoteFormModel, {
      ...quote,
    }).build(),
    validationSchema: quoteCreationSchemas[0],
    onSubmit: (values) => {
      setLoading(true);
      formik.setSubmitting(true);
      editQuote(values)
        .then(() => {
          navigate(`/${Routing.SaleQuotes}/${quote.id}/overview`);
          loadQuoteDetail(quote.id?.toString() || "");
        })
        .finally(() => {
          setLoading(false);
          formik.setSubmitting(false);
        });
    },
  });

  console.log(quote);
  console.log(formik);

  const goBack = () => navigate(`/${Routing.SaleQuotes}/${quote.id}/overview`);

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
          <h3 className="fw-bolder m-0">Thông tin báo giá</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="card-body border-top p-9">
            <QuoteInfoStep formik={formik as any} />
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              className="btn btn-light mx-6"
              disabled={loading}
              onClick={goBack}
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

export { QuoteOverviewEditCard };
