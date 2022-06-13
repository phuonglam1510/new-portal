import {UsersListHeader} from './components/header/UsersListHeader'
import {CompaniesTable} from './table/CompaniesTable'
import {KTCard} from '../../../../../_metronic/helpers'
import {CustomerProvider} from './core/CustomerProvider'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {CompanyEditModal} from './user-edit-modal/CompanyEditModal'

const CompanyList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <CompaniesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CompanyEditModal />}
    </>
  )
}

const CompanyListWrapper = () => (
  <CustomerProvider>
    <ListViewProvider>
      <CompanyList />
    </ListViewProvider>
  </CustomerProvider>
)

export {CompanyListWrapper}
