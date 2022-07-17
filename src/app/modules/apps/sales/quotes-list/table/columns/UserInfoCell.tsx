/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { Link } from "react-router-dom";
import { Routing } from "../../../../../../enums/Routing.enum";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";

type Props = {
  quote: QuoteModel;
};

const UserInfoCell: FC<Props> = ({ quote }) => (
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="d-flex flex-column">
      <Link to={`/${Routing.SaleQuotes}/${quote.id}`}>
        <a className="text-gray-800 text-hover-primary mb-1">
          {quote.contact?.contact_name}
        </a>
      </Link>
      <span>{quote.contact?.contact_position}</span>
    </div>
  </div>
);

export { UserInfoCell };
