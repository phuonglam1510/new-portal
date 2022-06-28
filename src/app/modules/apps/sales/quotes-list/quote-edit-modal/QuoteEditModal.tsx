import React, { useEffect } from "react";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteEditModalForm } from "./QuoteEditModalForm";
import { QuoteEditModalHeader } from "./QuoteEditModalHeader";

interface Props {
  onSave: (item: QuoteItemModel) => any
}

const QuoteEditModal: React.FC<Props> = ({ onSave }) => {
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
        <div className="modal-dialog modal-dialog-centered mw-750px">
          <div className="modal-content">
            <QuoteEditModalHeader />
            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <QuoteEditModalForm onSave={onSave} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { QuoteEditModal };
