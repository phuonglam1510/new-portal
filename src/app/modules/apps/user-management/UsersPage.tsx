import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {UsersListWrapper} from "./users-list/UsersList";
import {useCurrentUser} from "../core/CurrentUserProvider";
import {UserRole} from "../../../enums/UserRole.enum";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Quản lý người dùng",
    path: "/apps/user-management/users",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const UsersPage = () => {
  const user = useCurrentUser();
  if (user.role === UserRole.Monitor) {
    // @ts-ignore
    window.location = "/apps/sales/quotes";
  }
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="users"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Danh sách người dùng
              </PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/apps/user-management/users" />} />
    </Routes>
  );
};

export default UsersPage;
