import { UsersListHeader } from "./components/header/UsersListHeader";
import { ContactsTable } from "./table/ContactsTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { ContactProvider } from "./core/ContactProvider";
import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { ContactEditModal } from "./edit-modal/ContactEditModal";
import { CustomerProvider } from "../companies-list/core/CustomerProvider";

const ContactList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <ContactsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ContactEditModal />}
    </>
  );
};

const ContactListWrapper = () => (
  <CustomerProvider>
    <ContactProvider>
      <ListViewProvider>
        <ContactList />
      </ListViewProvider>
    </ContactProvider>
  </CustomerProvider>
);

export { ContactListWrapper };
