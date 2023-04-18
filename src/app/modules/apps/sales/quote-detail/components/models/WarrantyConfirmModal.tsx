import React, { useEffect } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";

interface Props {
  onOk: (answer: boolean) => any;
  onClose: () => any;
  title: string
}

const WarrantyConfirmModel: React.FC<Props> = ({ onOk, onClose, title }) => {
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
              <h2 className="fw-bolder">{ title }</h2>

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
            <div className="modal-body scroll-y">
              <div className="text-end pt-10">
                <button
                  type="reset"
                  onClick={() => onOk(false)}
                  className="btn btn-light me-3"
                  data-kt-users-modal-action="cancel"
                >
                  Không
                </button>

                <button className="btn btn-primary" onClick={() => onOk(true)}>
                  <span className="indicator-label">Có</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { WarrantyConfirmModel };
