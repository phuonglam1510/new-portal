import React, { FC, createContext, useContext, useState } from "react";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { ContactEditModal } from "../components/contact-modal/ContactEditModal";

interface ContextProps {
  visible: boolean;
  openModal: (
    contact: ContactModel,
    onSave: (contact: ContactModel) => any
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ContextProps>({
  closeModal: () => {},
  openModal: () => {},
  visible: false,
});

let onSave = (contact: ContactModel) => contact;

const ModalProvider: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [contact, setContact] = useState<ContactModel>(new ContactModel());

  const openModal = (
    contact: ContactModel,
    onSaveFn: (contact: ContactModel) => any
  ) => {
    setContact(contact);
    setVisible(true);
    onSave = onSaveFn;
  };

  const closeModal = () => {
    setContact(new ContactModel());
    setVisible(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, visible }}>
      {children}
      {visible && (
        <ContactEditModal
          contact={contact}
          onSave={onSave}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);
export { ModalProvider, useModalContext };
