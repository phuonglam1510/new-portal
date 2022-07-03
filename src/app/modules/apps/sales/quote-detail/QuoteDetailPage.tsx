import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../../_metronic/layout/core";
import { Routing } from "../../../../enums/Routing.enum";
import { QuoteInfoEditCard } from "./components/info/QuoteInfoEditCard";
import { ModelsView } from "./components/models/ModelsView";
import { Overview } from "./components/Overview";
import { QuoteOverviewEditCard } from "./components/overview/QuoteOverviewEditCard";
import { QuoteInfoView } from "./components/QuoteInfoView";
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

const QuoteDetailPage: React.FC = () => {
  const { loadQuoteDetail } = useQuoteDetailContext();
  const params = useParams();
  const id = params.id as string;

  React.useEffect(() => {
    loadQuoteDetail(id);
  }, [id]);

  return (
    <Routes>
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
            <QuoteInfoView />
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
        index
        element={<Navigate to={`/${Routing.SaleQuotes}/${id}/overview`} />}
      />
    </Routes>
  );
};

export default QuoteDetailPage;
