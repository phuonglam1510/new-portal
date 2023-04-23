import { useListView } from "../../core/ListViewProvider";
import { UsersListToolbar } from "./UserListToolbar";
import { UsersListGrouping } from "./UsersListGrouping";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { useQuoteContext } from "../../core/QuoteProvider";
import {useCurrentUser} from "../../../../core/CurrentUserProvider";
import {UserRole} from "../../../../../../enums/UserRole.enum";

const QuotesListHeader = () => {
  const { selected } = useListView();
  const { loading, exportManufacturerExcel } = useQuoteContext();
  const user = useCurrentUser();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />

      {/* begin::Card toolbar */}
      <div className="card-toolbar">
          {
              [UserRole.SuperAdmin, UserRole.ServiceManager, UserRole.Monitor].includes(user.role) &&
              <button
                  type="button"
                  className="btn btn-primary me-5"
                  disabled={loading}
                  onClick={() => exportManufacturerExcel()}
              >
                  Báo Cáo Hãng SX
              </button>
          }
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { QuotesListHeader };
