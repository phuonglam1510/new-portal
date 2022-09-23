import React, { FC, useEffect, useRef, useState } from "react";
import { Formik, Form, FormikValues } from "formik";
import { StepperComponent } from "../../../../../../_metronic/assets/ts/components";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { quoteCreationSchemas, QuoteFormModel } from "./quoteCreationSchemas";
import { QuoteInfoStep } from "./steps/QuoteInfoStep";
import { useQuoteActionContext } from "../core/QuoteActionProvider";
import { QuoteModelListStep } from "./steps/QuoteModelListStep";
import { QuoteOrderInfoStep } from "./steps/QuoteOrderInfoStep";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../../enums/Routing.enum";
import { QuoteAttachmentsStep } from "./steps/QuoteAttachmentsStep";
import { toast } from "../../../../../helpers/Toast.helper";
import { useQuoteContext } from "../core/QuoteProvider";

const NewQuote: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const stepper = useRef<StepperComponent | null>(null);
  const navigate = useNavigate();
  const [currentSchema, setCurrentSchema] = useState(quoteCreationSchemas[0]);
  const [initValues] = useState<QuoteFormModel>(new QuoteFormModel());
  const [isSubmitButton, setSubmitButton] = useState(false);

  const { refetch } = useQuoteContext();
  const { loading, createQuote, createQuoteInfo, createQuoteAttachments } =
    useQuoteActionContext();

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(
      stepperRef.current as HTMLDivElement
    );
  };

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }

    setSubmitButton(
      stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1
    );

    stepper.current.goPrev();

    setCurrentSchema(
      quoteCreationSchemas[stepper.current.currentStepIndex - 1]
    );
  };

  const goNext = (actions: FormikValues) => {
    if (!stepper.current) {
      return;
    }
    setSubmitButton(
      stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1
    );

    setCurrentSchema(quoteCreationSchemas[stepper.current.currentStepIndex]);

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext();
    } else {
      toast(`Tạo báo giá thành công!`);
      refetch();
      navigate(`/${Routing.SaleQuotes}`);
    }
    actions.setSubmitting(false);
  };

  const handleSubmit = async (
    values: QuoteFormModel,
    actions: FormikValues
  ) => {
    if (!stepper.current) {
      return;
    }

    if (stepper.current.currentStepIndex === 1) {
      const done = await createQuote(values);
      if (done) {
        goNext(actions);
      }
    } else if (stepper.current.currentStepIndex === 2) {
      goNext(actions);
    } else if (stepper.current.currentStepIndex === 3) {
      const done = await createQuoteInfo(values);
      if (done) {
        goNext(actions);
      }
    } else if (stepper.current.currentStepIndex === 4) {
      const done = await createQuoteAttachments(values);
      if (done) {
        goNext(actions);
      }
    }
  };

  const submitStep = (values: QuoteFormModel, actions: FormikValues) => {
    handleSubmit(values, actions);
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  return (
    <div className="card">
      <div className="card-header border-0 pt-9">
        <h4 className="card-title m-0 fs-1 fw-bold text-gray-600">
          Tạo báo giá
        </h4>
      </div>
      <div className="card-body">
        <div
          ref={stepperRef}
          className="stepper stepper-links d-flex flex-column"
          id="kt_create_account_stepper"
        >
          <div className="stepper-nav mb-5">
            <div className="stepper-item current" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Thông tin báo giá</h3>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Danh mục sản phẩm</h3>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Thông tin đơn hàng</h3>
            </div>
            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Chứng từ đi kèm</h3>
            </div>
          </div>

          <Formik
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {(formik) => (
              <Form
                className="mx-auto mw-800px w-100 pt-10 pb-10"
                id="kt_create_account_form"
              >
                <div className="current" data-kt-stepper-element="content">
                  <QuoteInfoStep formik={formik as any} />
                </div>

                <div data-kt-stepper-element="content">
                  <QuoteModelListStep formik={formik as any} />
                </div>

                <div data-kt-stepper-element="content">
                  <QuoteOrderInfoStep formik={formik as any} />
                </div>
                <div data-kt-stepper-element="content">
                  <QuoteAttachmentsStep formik={formik as any} />
                </div>

                <div className="d-flex flex-stack pt-15">
                  <div className="mr-2">
                    <button
                      onClick={prevStep}
                      type="button"
                      className="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      disabled={loading}
                    >
                      <KTSVG
                        path="/media/icons/duotune/arrows/arr063.svg"
                        className="svg-icon-4 me-1"
                      />
                      Back
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary me-3"
                      disabled={loading}
                    >
                      <span className="indicator-label">
                        {!isSubmitButton && "Continue"}
                        {isSubmitButton && "Submit"}
                        <KTSVG
                          path="/media/icons/duotune/arrows/arr064.svg"
                          className="svg-icon-3 ms-2 me-0"
                        />
                      </span>
                      {loading && (
                        <span className="indicator-progress">
                          Please wait...
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export { NewQuote };
