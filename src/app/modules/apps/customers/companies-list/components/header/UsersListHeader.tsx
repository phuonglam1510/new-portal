import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListSearchComponent} from './UsersListSearchComponent'
import {useCustomerContext} from "../../core/CustomerProvider";

const UsersListHeader = () => {
  const {selected} = useListView()
  const { isLoading, loading, exportCompanyReport } = useCustomerContext();

  return (
    <div className='card-header border-0 pt-6'>
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
          {
              !isLoading &&
              <button
                  type="button"
                  className="btn btn-primary me-5"
                  disabled={loading}
                  onClick={() => exportCompanyReport()}
              >
                  Xuất Báo Cáo Công Ty
              </button>
          }
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
