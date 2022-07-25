import React from "react";
import { MenuItem } from "./MenuItem";
import { useIntl } from "react-intl";

export function MenuInner() {
  const intl = useIntl();
  return (
    <>
      <MenuItem
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        to="/dashboard"
      />
      <MenuItem title={"Quản lý người dùng"} to="/apps/user-management/users" />
    </>
  );
}
