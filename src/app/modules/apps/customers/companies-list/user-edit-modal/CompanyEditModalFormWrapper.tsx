import {useQuery} from 'react-query'
import {CompanyEditModalForm} from './CompanyEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {CompanyModel} from '../../../../../models/customers/Company.class'
import {getCompanyById} from '../core/_requests'

const CompanyEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getCompanyById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <CompanyEditModalForm isUserLoading={isLoading} company={new CompanyModel()} />
  }

  if (!isLoading && !error && user) {
    return <CompanyEditModalForm isUserLoading={isLoading} company={user} />
  }

  return null
}

export {CompanyEditModalFormWrapper}
