import { KTSVG } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";

const ContactEditModalHeader = () => {
  const { setItemIdForUpdate } = useListView();

  return (
    <div className="modal-header">
      {/* begin::Modal title */}
      <h2 className="fw-bolder">Thêm người liên hệ</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className="btn btn-icon btn-sm btn-active-icon-primary"
        data-kt-users-modal-action="close"
        onClick={() => setItemIdForUpdate(undefined)}
        style={{ cursor: "pointer" }}
      >
        <KTSVG
          path="/media/icons/duotune/arrows/arr061.svg"
          className="svg-icon-1"
        />
      </div>
      {/* end::Close */}
    </div>
  );
};

export { ContactEditModalHeader };
