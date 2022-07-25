import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { GlobalProvider } from "./modules/apps/core/GlobalProvider";
import AuthInit from "./modules/auth/redux/AuthInit";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <GlobalProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </GlobalProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
