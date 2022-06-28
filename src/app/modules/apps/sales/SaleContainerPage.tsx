import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { Routing } from "../../../enums/Routing.enum";
import { QuoteListWrapper } from "./quotes-list/QuotesList";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Quản lý báo giá",
    path: Routing.SaleQuotes,
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
const moduleTitle = "Quản lý bán hàng";

const SaleContainerPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="quotes/*"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                {moduleTitle}
              </PageTitle>
              <QuoteListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to={Routing.SaleQuotes} />} />
    </Routes>
  );
};

export default SaleContainerPage;
