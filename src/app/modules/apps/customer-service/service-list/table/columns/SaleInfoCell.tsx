/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC } from "react";
import { User } from "../../../../../../models/users/User.interface";

type Props = {
  user: User;
};

const SaleInfoCell: FC<Props> = ({ user }) => (
  <div className="d-flex align-items-center">
    <div className="d-flex flex-column">
      <span>{user.name}</span>
    </div>
  </div>
);

export { SaleInfoCell };
