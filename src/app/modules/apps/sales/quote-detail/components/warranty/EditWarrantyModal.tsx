import React, { useEffect } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteWarrantyModel } from "../../../../../../models/sales/QuoteWarranty.model";
import { EditWarrantyModalForm } from "./EditWarrantyModalForm";

interface Props {
  onClose: () => void;
  item: QuoteWarrantyModel;
}

const EditWarrantyModal: React.FC<Props> = ({ onClose, item }) => {
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
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="fw-bolder">Tạo đơn bảo hành</h2>

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
            </div>
            <div className="modal-body scroll-y mx-5 my-2">
              <EditWarrantyModalForm onClose={onClose} item={item} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { EditWarrantyModal };
