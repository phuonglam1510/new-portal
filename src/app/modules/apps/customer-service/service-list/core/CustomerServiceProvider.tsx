import { Builder } from "builder-pattern";
import React, { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import {CustomerServiceModel} from "../../../../../models/customers/CustomerService.class";
import {getCustomerServices} from "./_requests";
import {
    initialPagingContext,
    PagingContextProps,
    withPaging,
} from "../../../core/hooks/usePagingProvider";
import { PaginationQuery } from "../../../../../models/core/PaginationQuery.model";
import {QuotesFilter} from "../../../sales/quotes-list/core/QuoteProvider";

export class CustomerServiceFilter {
    search: string = "";
    sort: string = "";
    order?: "asc" | "desc" = "asc";
}

interface ContextProps extends PagingContextProps {
    customerServices: CustomerServiceModel[];
    refetchCustomerService: () => void;
    isLoading: boolean;
    query: string;
    updateFilter: (values: Partial<CustomerServiceFilter>) => any;
    filter: CustomerServiceFilter;
}

const CustomerServiceContext = createContext<ContextProps>({
    customerServices: [],
    refetchCustomerService: () => {},
    updateFilter: () => {},
    isLoading: false,
    query: "",
    filter: new CustomerServiceFilter(),
    ...initialPagingContext,
});

const CustomerServiceProvider = withPaging(({ children, setPaging, paging }: any) => {
    const [filter, setFilter] = useState(new CustomerServiceFilter());
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
        data: customerServices = [],
    } = useQuery(
        `customer-service-list-${query}`,
        () => {
            return getCustomerServices(query).then((res) => {
                const items = res.data || [];
                setPaging({ ...paging, total: res.total_row });

                return items.map((itemJson) => Builder(CustomerServiceModel, itemJson).build());
            });
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    );

    const updateFilter = (values: Partial<QuotesFilter>) => {
        setFilter({ ...filter, ...values });
        setPaging(new PaginationQuery());
    };

    return (
        <CustomerServiceContext.Provider
            value={{
                isLoading: isFetching,
                refetchCustomerService: refetch,
                query,
                customerServices,
                updateFilter,
                setPaging,
                paging,
                filter,
            }}
        >
            {children}
        </CustomerServiceContext.Provider>
    );
});

const useCustomerServiceContext = () => useContext(CustomerServiceContext);
export { CustomerServiceProvider, useCustomerServiceContext };