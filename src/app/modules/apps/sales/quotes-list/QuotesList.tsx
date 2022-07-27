import { QuotesListHeader } from "./components/header/QuotesListHeader";
import { QuotesTable } from "./table/QuotesTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { QuoteProvider } from "./core/QuoteProvider";
import { ListViewProvider } from "./core/ListViewProvider";
import { Outlet, Route, Routes } from "react-router-dom";
import { NewQuote } from "./new-quote/NewQuote";
import { CustomerProvider } from "../../customers/companies-list/core/CustomerProvider";
import { ContactProvider } from "../../customers/contacts-list/core/ContactProvider";
import { QuoteActionProvider } from "./core/QuoteActionProvider";
import { QuoteModalProvider } from "./core/QuoteModalProvider";
import QuoteDetailPage from "../quote-detail/QuoteDetailPage";
import { QuoteDetailProvider } from "../quote-detail/core/QuoteDetailProvider";
import { ListViewAddonProvider } from "./core/ListViewAddonProvider";

const QuoteList = () => {
  return (
    <>
      <KTCard>
        <QuotesListHeader />
        <QuotesTable />
      </KTCard>
    </>
  );
};

const QuoteListWrapper = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path=""
        element={
          <QuoteProvider>
            <ListViewProvider>
              <ContactProvider>
                <ListViewAddonProvider>
                  <QuoteList />
                </ListViewAddonProvider>
              </ContactProvider>
            </ListViewProvider>
          </QuoteProvider>
        }
      />
      <Route
        path=":id/*"
        element={
          <CustomerProvider>
            <ContactProvider>
              <QuoteActionProvider>
                <QuoteDetailProvider>
                  <QuoteModalProvider>
                    <QuoteDetailPage />
                  </QuoteModalProvider>
                </QuoteDetailProvider>
              </QuoteActionProvider>
            </ContactProvider>
          </CustomerProvider>
        }
      />
      <Route
        path="new"
        element={
          <QuoteProvider>
            <QuoteActionProvider>
              <CustomerProvider>
                <ContactProvider>
                  <QuoteModalProvider>
                    <NewQuote />
                  </QuoteModalProvider>
                </ContactProvider>
              </CustomerProvider>
            </QuoteActionProvider>
          </QuoteProvider>
        }
      />
    </Route>
  </Routes>
);

export { QuoteListWrapper };
