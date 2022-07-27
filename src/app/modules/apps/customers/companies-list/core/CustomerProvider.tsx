import { Builder } from "builder-pattern";
import React, { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { getCompanies } from "./_requests";

export class CompaniesFilter {
  search: string = "";
  sort: string = "";
  order?: "asc" | "desc" = "asc";
}

interface ContextProps {
  companies: CompanyModel[];
  refetchCompanies: () => void;
  isLoading: boolean;
  query: string;
  updateFilter: (values: Partial<CompaniesFilter>) => any;
  filter: CompaniesFilter;
}

const CustomerContext = createContext<ContextProps>({
  companies: [],
  refetchCompanies: () => {},
  updateFilter: () => {},
  isLoading: false,
  query: "",
  filter: new CompaniesFilter(),
});

const CustomerProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState(new CompaniesFilter());
  const { search } = filter;
  const query = React.useMemo(
    () => qs.stringify({ key: search || undefined }),
    [filter]
  );
  const {
    isFetching,
    refetch,
    data: companies = [],
  } = useQuery(
    `company-list-${query}`,
    () => {
      return getCompanies(query).then((res) => {
        const items = res.data || [];
        return items.map((itemJson) => Builder(CompanyModel, itemJson).build());
      });
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const updateFilter = (values: Partial<CompaniesFilter>) => {
    setFilter({ ...filter, ...values });
    refetch();
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoading: isFetching,
        refetchCompanies: refetch,
        query,
        companies,
        updateFilter,
        filter,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

const useCustomerContext = () => useContext(CustomerContext);
export { CustomerProvider, useCustomerContext };
