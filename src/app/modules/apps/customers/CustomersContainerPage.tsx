import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { CompanyListWrapper } from "./companies-list/CompaniesList";
import { ContactListWrapper } from "./contacts-list/ContactList";
import { EmailMarketingWrapper } from "./email-marketing/EmailMarketing";
import { ExportContactWrapper } from "./contact-export/ExportContact";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Quản lý công ty",
    path: "/apps/customers/companies",
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
const contactsBreadcrumbs: Array<PageLink> = [
  {
    title: "Quản lý người liên hệ",
    path: "/apps/customers/contacts",
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

const emailMarketingBreadcrumbs: Array<PageLink> = [
  {
    title: "Email Marketing",
    path: "/apps/customers/mail",
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

const exportContactBreadcrumbs: Array<PageLink> = [
    {
        title: "Báo Cáo Danh Sách Người Liên Hệ",
        path: "/apps/customers/export-contact",
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

const moduleTitle = "Quản lý khách hàng";

const CustomersContainerPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="companies"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                {moduleTitle}
              </PageTitle>
              <CompanyListWrapper />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path="contacts"
          element={
            <>
              <PageTitle breadcrumbs={contactsBreadcrumbs}>
                {moduleTitle}
              </PageTitle>
              <ContactListWrapper />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
            path="mail"
            element={
              <>
                <PageTitle breadcrumbs={exportContactBreadcrumbs}>
                  {moduleTitle}
                </PageTitle>
                <EmailMarketingWrapper />
              </>
            }
        />
      </Route>
        <Route element={<Outlet />}>
            <Route
                path="export-contact"
                element={
                    <>
                        <PageTitle breadcrumbs={exportContactBreadcrumbs}>
                            {moduleTitle}
                        </PageTitle>
                        <ExportContactWrapper />
                    </>
                }
            />
        </Route>
      <Route index element={<Navigate to="/apps/customers/companies" />} />
    </Routes>
  );
};

export default CustomersContainerPage;
