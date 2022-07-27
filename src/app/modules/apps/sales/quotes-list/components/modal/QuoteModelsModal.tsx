import React, { useEffect } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";
import { ModelsTable } from "../../../quote-detail/components/models/ModelsTable";

interface Props {
  quote: QuoteModel;
  onClose: () => void;
}

const QuoteModelsModal: React.FC<Props> = ({ quote, onClose }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered mw-950px">
          <div className="modal-content">
            <div className="modal-header">
              {/* begin::Modal title */}
              <h2 className="fw-bolder">Model báo giá</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                onClick={onClose}
                style={{ cursor: "pointer" }}
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon-1"
                />
              </div>
              {/* end::Close */}
            </div>
            <div className="modal-body scroll-y">
              <ModelsTable quote={quote} hideActions hideSelections />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { QuoteModelsModal };
