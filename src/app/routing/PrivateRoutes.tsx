import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import SaleContainerPage from "../modules/apps/sales/SaleContainerPage";
import { ContactProvider } from "../modules/apps/customers/contacts-list/core/ContactProvider";
import { QuoteProvider } from "../modules/apps/sales/quotes-list/core/QuoteProvider";
import { CustomerProvider } from "../modules/apps/customers/companies-list/core/CustomerProvider";

const PrivateRoutes = () => {
  const CustomersContainerPage = lazy(
    () => import("../modules/apps/customers/CustomersContainerPage")
  );
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="account/*"
          element={
            <SuspensedView>
              <CustomerProvider>
                <ContactProvider>
                  <QuoteProvider>
                    <AccountPage />
                  </QuoteProvider>
                </ContactProvider>
              </CustomerProvider>
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/customers/*"
          element={
            <SuspensedView>
              <CustomersContainerPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/sales/*"
          element={
            <SuspensedView>
              <SaleContainerPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
