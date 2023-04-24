import {ListViewProvider, useListView} from './core/ListViewProvider'
import { CustomerProvider } from '../../customers/companies-list/core/CustomerProvider';
import { CustomerServiceProvider } from './core/CustomerServiceProvider';
import { CustomerServiceListHeader } from './components/header/UsersListHeader'
import {CustomerServiceTable} from './table/CustomerServiceTable'
import {KTCard} from '../../../../../_metronic/helpers'
import {CustomerServiceEditModal} from "./customer-service-edit-modal/CustomerServiceEditModal";

const CustomerServiceList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <CustomerServiceListHeader />
        <CustomerServiceTable />
      </KTCard>
        {itemIdForUpdate !== undefined && <CustomerServiceEditModal />}
    </>
  )
}

const CustomerServiceListWrapper = () => (
  <CustomerProvider>
    <CustomerServiceProvider>
      <ListViewProvider>
        <CustomerServiceList />
      </ListViewProvider>
    </CustomerServiceProvider>
  </CustomerProvider>
)

export {CustomerServiceListWrapper}
