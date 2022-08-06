/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";
import { useQuoteContext } from "../../core/QuoteProvider";

const createPageItem = (totalPage: number) => {
  const items = [];
  for (let index = 0; index < totalPage; index++) {
    items.push(index + 1);
  }
  return items;
};

const QuotesListPagination = () => {
  const { isLoading, paging, setPaging } = useQuoteContext();
  const pages = React.useMemo(
    () => createPageItem(Math.ceil(paging.total / paging.size)),
    [paging.total, paging.size]
  );
  const updatePage = (page: number | null) => {
    if (!page || isLoading || paging.page === page) {
      return;
    }
    setPaging({ ...paging, page });
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <div id="kt_table_users_paginate">
          <ul className="pagination">
            <li
              key="previous"
              className={clsx("page-item previous", {
                disabled: isLoading,
              })}
            >
              <a
                className="page-link"
                onClick={() => updatePage(paging.page - 1)}
                dangerouslySetInnerHTML={{ __html: "&laquo; Previous" }}
                style={{ cursor: "pointer" }}
              />
            </li>
            {pages.map((pageNumber) => (
              <li
                key={pageNumber}
                className={clsx("page-item", {
                  active: paging.page === pageNumber,
                  disabled: isLoading,
                })}
              >
                <a
                  className="page-link"
                  onClick={() => updatePage(pageNumber)}
                  dangerouslySetInnerHTML={{ __html: pageNumber.toString() }}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
            <li
              key="next"
              className={clsx("page-item next", {
                disabled: isLoading,
              })}
            >
              <a
                className="page-link"
                onClick={() => updatePage(paging.page + 1)}
                dangerouslySetInnerHTML={{ __html: "Next &raquo;" }}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { QuotesListPagination };
