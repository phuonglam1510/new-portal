import React, { useState } from "react";
import { PaginationQuery } from "../../../../models/core/PaginationQuery.model";

export interface PagingContextProps {
  setPaging: (paging: PaginationQuery) => any;
  paging: PaginationQuery;
}

export const initialPagingContext = {
  paging: new PaginationQuery(),
  setPaging: () => true,
};

export const withPaging = (Component: any) => {
  return (props: any) => {
    const [paging, setPaging] = useState(new PaginationQuery());

    return <Component {...props} paging={paging} setPaging={setPaging} />;
  };
};
