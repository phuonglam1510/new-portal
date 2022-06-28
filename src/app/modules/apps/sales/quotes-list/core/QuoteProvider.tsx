import { Builder } from "builder-pattern";
import { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { getQuotes } from "./_requests";

export class QuotesFilter {
  search: string = "";
  sort: string = "";
  order?: "asc" | "desc" = "asc";
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
  const query = "";
  const {
    isFetching,
    refetch,
    data: companies = [],
  } = useQuery(
    `company-list-${query}`,
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
