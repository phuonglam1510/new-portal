import { useEffect } from "react";
import { ContactEditModalHeader } from "./ContactEditModalHeader";
import { ContactEditModalFormWrapper } from "./ContactEditModalFormWrapper";

const ContactEditModal = () => {
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
            <ContactEditModalHeader />
            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <ContactEditModalFormWrapper />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { ContactEditModal };
