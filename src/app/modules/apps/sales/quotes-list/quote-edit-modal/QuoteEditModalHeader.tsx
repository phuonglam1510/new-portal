import { KTSVG } from "../../../../../../_metronic/helpers";
import { useQuoteModalContext } from "../core/QuoteModalProvider";

const QuoteEditModalHeader = () => {
  const { itemForUpdate, close } = useQuoteModalContext();

  return (
    <div className="modal-header">
      {/* begin::Modal title */}
      <h2 className="fw-bolder">
        {itemForUpdate?.id ? "Cập nhật " : "Thêm"} model báo giá
      </h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className="btn btn-icon btn-sm btn-active-icon-primary"
        data-kt-users-modal-action="close"
        onClick={close}
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

export { QuoteEditModalHeader };
