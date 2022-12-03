import React from "react";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../../_metronic/layout/core";
import { Routing } from "../../../../enums/Routing.enum";
import { QuoteInfoEditCard } from "./components/info/QuoteInfoEditCard";
import { ModelsView } from "./components/models/ModelsView";
import { Overview } from "./components/Overview";
import { QuoteOverviewEditCard } from "./components/overview/QuoteOverviewEditCard";
import { QuoteAttachmentsView } from "./components/QuoteAttachmentsView";
import { QuoteInfoView } from "./components/QuoteInfoView";
import { QuoteTermView } from "./components/QuoteTermView";
import { QuoteTermEditCard } from "./components/term/QuoteTermEditCard";
import { WarrantyListView } from "./components/WarrantyListView";
import { useQuoteDetailContext } from "./core/QuoteDetailProvider";
import { QuoteDetailHeader } from "./QuoteDetailHeader";

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: "Chi tiết báo giá",
    path: "/crafted/account/overview",
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

const ContainerLoading = () => {
  const styles = {
    borderRadius: "0.475rem",
    boxShadow: "0 0 50px 0 rgb(82 63 105 / 15%)",
    backgroundColor: "#fff",
    color: "#7e8299",
    fontWeight: "500",
    margin: "0",
    width: "auto",
    padding: "1rem 2rem",
    top: "calc(50% - 2rem)",
    left: "calc(50% - 4rem)",
  };

  return (
    <div>
      <div
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: "absolute",
          backgroundColor: "black",
          opacity: 0.3,
        }}
      />
      <div style={{ ...styles, position: "absolute", textAlign: "center" }}>
        Processing...
      </div>
    </div>
  );
};

const QuoteDetailPage: React.FC = () => {
  const { loadQuoteDetail, loading, quote } = useQuoteDetailContext();
  const { quote_info, quote_exported_info } = quote;
  const params = useParams();
  const id = params.id as string;

  React.useEffect(() => {
    loadQuoteDetail(id);
  }, [id]);

  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
            {loading && <ContainerLoading />}
          </>
        }
      >
        <Route
          path="overview"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
              <Overview />
            </>
          }
        />
        <Route
          path="overview/edit"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Edit Overview
              </PageTitle>
              <QuoteOverviewEditCard />
            </>
          }
        />
        <Route
          path="models"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>Models</PageTitle>
              <ModelsView />
            </>
          }
        />
        <Route
          path="info"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>Info</PageTitle>
              <QuoteInfoView info={quote_info} quote={quote} />
            </>
          }
        />
        <Route
          path="export-info"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Export Info
              </PageTitle>
              <QuoteInfoView info={quote_exported_info} quote={quote} readOnly />
            </>
          }
        />
        <Route
          path="info/edit"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>Edit Info</PageTitle>
              <QuoteInfoEditCard />
            </>
          }
        />
        <Route
          path="attachments"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Chứng từ đi kèm
              </PageTitle>
              <QuoteAttachmentsView />
            </>
          }
        />
        <Route
          path="warranty"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Đơn bảo hành
              </PageTitle>
              <WarrantyListView />
            </>
          }
        />
        <Route
          path="term"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Điều Khoản & Bảo Hành
              </PageTitle>
              <QuoteTermView />
            </>
          }
        />
        <Route
          path="term/edit"
          element={
            <>
              <QuoteDetailHeader />
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                Điều Khoản & Bảo Hành
              </PageTitle>
              <QuoteTermEditCard />
            </>
          }
        />
        <Route
          index
          element={<Navigate to={`/${Routing.SaleQuotes}/${id}/overview`} />}
        />
      </Route>
    </Routes>
  );
};

export default QuoteDetailPage;
