import { KTSVG } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";

const UsersListToolbar = () => {
  const { setItemIdForUpdate } = useListView();
  const openAddCustomerService = () => {
    setItemIdForUpdate(null);
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
    >
      {/* <UsersListFilter /> */}

      {/* begin::Add user */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddCustomerService}
      >
        <KTSVG
          path="/media/icons/duotune/arrows/arr075.svg"
          className="svg-icon-2"
        />
        Tạo Lịch CSKH
      </button>
      {/* end::Add user */}
    </div>
  );
};

export { UsersListToolbar };
