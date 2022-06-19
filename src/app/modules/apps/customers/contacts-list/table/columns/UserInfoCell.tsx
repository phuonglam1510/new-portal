/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { ContactModel } from "../../../../../../models/customers/Contact.class";

type Props = {
  contact: ContactModel;
};

const UserInfoCell: FC<Props> = ({ contact }) => (
  <div className="d-flex align-items-center">
    <div className="d-flex flex-column">
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {contact.contact_name}
      </a>
      <span>{contact.contact_email}</span>
    </div>
  </div>
);

export { UserInfoCell };
