import React, { useEffect } from "react";
import { ContactModel } from "../../../../../../models/customers/Contact.class";
import { ContactEditModalForm } from "../../../contacts-list/edit-modal/ContactEditModalForm";
import { ContactEditModalHeader } from "../../../contacts-list/edit-modal/ContactEditModalHeader";

interface Props {
  contact: ContactModel;
  onSave: (contact: ContactModel) => void;
  onClose: () => void;
}

const ContactEditModal: React.FC<Props> = ({ contact, onSave, onClose }) => {
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
              <ContactEditModalForm
                isUserLoading={false}
                onSubmit={onSave}
                onClose={onClose}
                contact={contact || new ContactModel()}
                disableCompany
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { ContactEditModal };
