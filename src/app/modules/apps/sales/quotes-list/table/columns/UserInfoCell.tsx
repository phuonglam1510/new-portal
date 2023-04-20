/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Routing } from "../../../../../../enums/Routing.enum";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";

type Props = {
    quote: QuoteModel;
};

const UserInfoCell: FC<Props> = ({ quote }) => (
  <div className="d-flex align-items-center">
    <div className="d-flex flex-column">
      <Link to={`/${Routing.SaleQuotes}/${quote?.id}`}>
        <span className="text-gray-800 text-hover-primary mb-1">
          {quote?.contact?.company?.company_name}
        </span>
      </Link>
      <span>{quote?.contact?.contact_name}</span>
    </div>
  </div>
);

const UsePercentCell: FC<Props> = ({ quote }) => (
    <div className="d-flex align-items-center">
        {   quote?.of_current_user ?
            <div className="d-flex flex-column text-center">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => { if (quote.callback) quote.callback(quote) }}
                >
                    {quote.possible_percent} %
                </button>
            </div>
            : <div className="d-flex flex-column text-center">
                <span>{quote?.possible_percent} %</span>
            </div>
        }
    </div>
);

export { UserInfoCell, UsePercentCell };
