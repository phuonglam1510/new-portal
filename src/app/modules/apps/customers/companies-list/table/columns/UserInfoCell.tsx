/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC } from "react";
import { CompanyModel } from "../../../../../../models/customers/Company.class";

type Props = {
  company: CompanyModel;
};

const UserInfoCell: FC<Props> = ({ company }) => (
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
      <a href="#">
        {company.logo_id ? (
          <div className="symbol-label">
            <img
              src={company.logoUrl}
              alt={company.company_name}
              className="w-100"
            />
          </div>
        ) : (
          <div className={clsx("symbol-label fs-3")}>
            {company.company_name}
          </div>
        )}
      </a>
    </div>
    <div className="d-flex flex-column">
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {company.company_name}
      </a>
      {/*<span>{company.company_address}</span>*/}
    </div>
  </div>
);

export { UserInfoCell };
