import {Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {CustomerServiceListWrapper} from "./service-list/CustomerServiceList";
import {Routing} from "../../../enums/Routing.enum";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Khách Hàng",
    path: Routing.CustomerService,
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

const moduleTitle = "Chăm Sóc Khách Hàng";
const CustomerServicePage = () => {
  return (
      <Routes>
        <Route element={<Outlet />}>
          <Route
              path="list"
              element={
                <>
                  <PageTitle breadcrumbs={usersBreadcrumbs}>
                    {moduleTitle}
                  </PageTitle>
                  <CustomerServiceListWrapper />
                </>
              }
          />
        </Route>
      {/*<Route index element={<Navigate to="/apps/customer-service" />} />*/}
    </Routes>
  );
};

export default CustomerServicePage;
