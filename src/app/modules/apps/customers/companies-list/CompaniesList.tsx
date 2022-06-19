import { UsersListHeader } from "./components/header/UsersListHeader";
import { CompaniesTable } from "./table/CompaniesTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { CustomerProvider } from "./core/CustomerProvider";
import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { CompanyEditModal } from "./user-edit-modal/CompanyEditModal";
import { ContactProvider } from "../contacts-list/core/ContactProvider";
import { ModalProvider } from "./core/ModalProvider";

const CompanyList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <CompaniesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CompanyEditModal />}
    </>
  );
};

const CompanyListWrapper = () => (
  <CustomerProvider>
    <ContactProvider>
      <ModalProvider>
        <ListViewProvider>
          <CompanyList />
        </ListViewProvider>
      </ModalProvider>
    </ContactProvider>
  </CustomerProvider>
);

export { CompanyListWrapper };
