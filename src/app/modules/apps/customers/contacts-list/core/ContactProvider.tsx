import React, { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { getContacts } from "./_requests";
import qs from "qs";
import {loadAndOpenPdfFile} from "../../../sales/quotes-list/core/_util";

export class ContactFilter {
  search: string = "";
  sort: string = "";
  order?: "asc" | "desc" = "asc";
}

interface ContextProps {
  contacts: ContactModel[];
  refetch: () => void;
  isLoading: boolean;
  query: string;
  updateFilter: (values: Partial<ContactFilter>) => any;
    exportContactReport: (companyId: string) => Promise<boolean>;
  filter: ContactFilter;
}

const CustomerContext = createContext<ContextProps>({
  contacts: [],
  refetch: () => {},
  updateFilter: () => {},
  isLoading: false,
  query: "",
    exportContactReport: (companyId: string) => new Promise(resolve => true),
  filter: new ContactFilter(),
});

const ContactProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState(new ContactFilter());
  const query = React.useMemo(
    () => qs.stringify({ size: 1000, page: 1 }),
    [filter]
  );
  const {
    isFetching,
    refetch,
    data: contacts = [],
  } = useQuery(
    `contact-list-${query}`,
    () => {
      return getContacts(query).then((res) => {
        return res.data || [];
      });
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const updateFilter = (values: Partial<ContactFilter>) => {
    setFilter({ ...filter, ...values });
    refetch();
  };

    const exportContactReport = async(companyId: string): Promise<boolean> => {
        try {
            const baseUrl = `${process.env.REACT_APP_THEME_API_URL}`;
            const url = `${baseUrl}/company/${companyId}/contact-export`;
            await loadAndOpenPdfFile(
                url,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "ContactReport.xlsx"
            );
            return true;
        } catch (error) {
            return false;
        }
    }

  return (
    <CustomerContext.Provider
      value={{
        isLoading: isFetching,
        refetch,
        query,
        contacts,
        updateFilter,
          exportContactReport,
        filter,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

const useContactContext = () => useContext(CustomerContext);
export { ContactProvider, useContactContext };
