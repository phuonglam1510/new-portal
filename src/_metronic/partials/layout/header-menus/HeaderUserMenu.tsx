/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserModel } from "../../../../app/modules/auth/models/UserModel";
import { RootState } from "../../../../setup";
import { Languages } from "./Languages";
import * as auth from "../../../../app/modules/auth/redux/AuthRedux";
import { useDispatch } from "react-redux";
import { toAbsoluteUrl } from "../../../helpers";
import { Routing } from "../../../../app/enums/Routing.enum";

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(
    ({ auth }) => auth.user,
    shallowEqual
  ) as UserModel;

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(auth.actions.logout());
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img
              alt="Logo"
              src={
                user.avatar
                  ? user.avatar.file_url
                  : toAbsoluteUrl("/media/avatars/300-1.jpg")
              }
            />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {user.name}
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to={`/${Routing.SaleQuotes}`} className="menu-link px-5">
          Quản lý báo giá
        </Link>
      </div>

      <div className="separator my-2"></div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link to="/account/overview" className="menu-link px-5">
          Cài đặt tài khoản
        </Link>
      </div>

      <div className="menu-item px-5">
        <a onClick={logout} className="menu-link px-5">
          Đăng xuất
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
