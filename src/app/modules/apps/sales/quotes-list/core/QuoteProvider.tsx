import { Builder } from "builder-pattern";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { getQuotes } from "./_requests";
import { QuoteType } from "../../../../../enums/QuoteType.enum";
import { QuoteStatus } from "../../../../../enums/QuoteStatus.enum";
import {
  initialPagingContext,
  PagingContextProps,
  withPaging,
} from "../../../core/hooks/usePagingProvider";
import { PaginationQuery } from "../../../../../models/core/PaginationQuery.model";

export class QuotesFilter {
  search: string = "";
  sort: string = "";
  order?: "asc" | "desc" = "asc";
  contact_id?: number;
  company_id?: number;
  type?: QuoteType;
  status?: QuoteStatus;
  date?: string;
  sale_id?: number;
}

interface ContextProps extends PagingContextProps {
  companies: QuoteModel[];
  refetch: () => void;
  isLoading: boolean;
  query: string;
  updateFilter: (values: Partial<QuotesFilter>) => any;
  filter: QuotesFilter;
}

const QuoteContext = createContext<ContextProps>({
  companies: [],
  refetch: () => {},
  updateFilter: () => {},
  isLoading: false,
  query: "",
  filter: new QuotesFilter(),
  ...initialPagingContext,
});

const QuoteProvider = withPaging(({ children, setPaging, paging }: any) => {
  const [filter, setFilter] = useState(new QuotesFilter());
  const { search, ...rest } = filter;
  const { page, size } = paging;
  const query = React.useMemo(
    () =>
      qs.stringify({
        ...rest,
        key: search || undefined,
        page,
        size,
      }),
    [filter, paging.size, paging.page]
  );
  const {
    isFetching,
    refetch,
    data: companies = [],
  } = useQuery(
    `quote-list-${query}`,
    () => {
      return getQuotes(query).then((res) => {
        const items = res.data || [];
        setPaging({ ...paging, total: res.total_row });

        return items.map((itemJson) => Builder(QuoteModel, itemJson).build());
      });
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const updateFilter = (values: Partial<QuotesFilter>) => {
    setFilter({ ...filter, ...values });
    setPaging(new PaginationQuery());
  };

  useEffect(() => {
    refetch();
  }, [paging.size, paging.page]);

  return (
    <QuoteContext.Provider
      value={{
        isLoading: isFetching,
        refetch,
        query,
        companies,
        updateFilter,
        filter,
        setPaging,
        paging,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
});

const useQuoteContext = () => useContext(QuoteContext);
export { QuoteProvider, useQuoteContext };
