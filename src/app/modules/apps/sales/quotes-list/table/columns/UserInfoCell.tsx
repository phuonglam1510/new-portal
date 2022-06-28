/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";

type Props = {
  quote: QuoteModel;
};

const UserInfoCell: FC<Props> = ({ quote }) => (
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="d-flex flex-column">
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {quote.contact.contact_name}
      </a>
      <span>{quote.contact.contact_phone}</span>
    </div>
  </div>
);

export { UserInfoCell };
