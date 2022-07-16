import { Link } from "react-router-dom";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { Routing } from "../../../../../../enums/Routing.enum";
import { useListView } from "../../core/ListViewProvider";
import { UsersListFilter } from "./UsersListFilter";

const UsersListToolbar = () => {
  const { setItemIdForUpdate } = useListView();
  const openAddUserModal = () => {
    setItemIdForUpdate(null);
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
    >
      <UsersListFilter />

      <Link to={Routing.NewQuote}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddUserModal}
        >
          <KTSVG
            path="/media/icons/duotune/arrows/arr075.svg"
            className="svg-icon-2"
          />
          Tạo báo giá
        </button>
      </Link>
    </div>
  );
};

export { UsersListToolbar };
