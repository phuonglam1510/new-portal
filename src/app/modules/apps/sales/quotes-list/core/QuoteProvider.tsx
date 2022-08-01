import { Builder } from "builder-pattern";
import React, { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { getQuotes } from "./_requests";
import { QuoteType } from "../../../../../enums/QuoteType.enum";
import { QuoteStatus } from "../../../../../enums/QuoteStatus.enum";

export class QuotesFilter {
  search: string = "";
  sort: string = "";
  order?: "asc" | "desc" = "asc";
  contact_id?: number;
  type?: QuoteType;
  status?: QuoteStatus;
}

interface ContextProps {
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
});

const QuoteProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState(new QuotesFilter());
  const { contact_id, type, status, search } = filter;
  const query = React.useMemo(
    () => qs.stringify({ contact_id, type, status, key: search || undefined }),
    [filter]
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
        return items.map((itemJson) => Builder(QuoteModel, itemJson).build());
      });
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const updateFilter = (values: Partial<QuotesFilter>) => {
    setFilter({ ...filter, ...values });
    refetch();
  };

  return (
    <QuoteContext.Provider
      value={{
        isLoading: isFetching,
        refetch,
        query,
        companies,
        updateFilter,
        filter,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

const useQuoteContext = () => useContext(QuoteContext);
export { QuoteProvider, useQuoteContext };
