import { FC, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { getContacts } from "./_requests";

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
  filter: ContactFilter;
}

const CustomerContext = createContext<ContextProps>({
  contacts: [],
  refetch: () => {},
  updateFilter: () => {},
  isLoading: false,
  query: "",
  filter: new ContactFilter(),
});

const ContactProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState(new ContactFilter());
  const query = "";
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

  return (
    <CustomerContext.Provider
      value={{
        isLoading: isFetching,
        refetch,
        query,
        contacts,
        updateFilter,
        filter,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

const useContactContext = () => useContext(CustomerContext);
export { ContactProvider, useContactContext };
