import React, {useEffect, useState} from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";
import { ModelsTable } from "../../../quote-detail/components/models/ModelsTable";
import { useLocation } from 'react-router-dom'
import {useQuoteActionContext} from "../../core/QuoteActionProvider";
import { WarrantyConfirmModel } from "../../../quote-detail/components/models/WarrantyConfirmModal";
import {showError} from "../../../../../../helpers/Error.helper";

interface Props {
  quote: QuoteModel;
  onClose: () => void;
}

const QuoteModelsModal: React.FC<Props> = ({ quote, onClose}) => {
  const {
    loading,
  } = useQuoteActionContext();
  const [ids, setIds] = useState<number[]>([]);
  const [exportWarrantyVisible, setExportWarrantyVisible] = useState<boolean>(false);
  const [exportDeliveryVisible, setExportDeliveryVisible] = useState<boolean>(false);
  const {
    exportWarranty,
    exportDelivery
  } = useQuoteActionContext();

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  const location = useLocation();
  const paths = location.pathname.split("/");
  let isExportedInfo = false;
  if (paths[paths.length - 1] && paths[paths.length - 1]  == "export-info") {
    isExportedInfo = true;
  }
  const onExportDelivery = async () => {
    setExportDeliveryVisible(false);
    exportDelivery(quote.id || 0, ids).then(() => setIds([]));
  };
  const onExportWarranty = async () => {
    setExportWarrantyVisible(false);
    exportWarranty(quote.id || 0, ids).then(() => setIds([]));
  };
  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered mw-950px">
          <div className="modal-content">
            <div className="modal-header">
              {/* begin::Modal title */}
              <h2 className="fw-bolder">Model báo giá</h2>
              {/* end::Modal title */}
              {isExportedInfo && ids.length > 0 &&
                  <>
                  <div className="d-flex align-items-right">
                    <button
                        type="button"
                        className="btn btn-light-primary m-4"
                        onClick={() => setExportWarrantyVisible(true)}
                        disabled={loading}
                    >
                      <KTSVG
                          path="/media/icons/duotune/arrows/arr078.svg"
                          className="svg-icon-2"
                      />
                      {loading
                          ? "Đang xuất PDF..."
                          : `Xuất Giấy Bảo Hành(${ids.length})`}
                    </button>
                    <button
                        type="button"
                        className="btn btn-light-primary m-4"
                        onClick={() => setExportDeliveryVisible(true)}
                        disabled={loading}
                    >
                      <KTSVG
                          path="/media/icons/duotune/arrows/arr078.svg"
                          className="svg-icon-2"
                      />
                      {loading
                          ? "Đang xuất PDF..."
                          : `Xuất Biên Bản Giao Hàng(${ids.length})`}
                    </button>
                  </div>
                  {exportWarrantyVisible && (
                        <WarrantyConfirmModel
                            onOk={() => onExportWarranty()}
                            onClose={() => setExportWarrantyVisible(false)}
                            title="Xuất giấy bảo hành"
                        />
                    )}
                    {exportDeliveryVisible && (
                        <WarrantyConfirmModel
                            onOk={() => onExportDelivery()}
                            onClose={() => setExportDeliveryVisible(false)}
                            title="Xuất biên bản giao hàng"
                        />
                    )}
                  </>
              }
              {/* begin::Close */}
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                onClick={onClose}
                style={{ cursor: "pointer" }}
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon-1"
                />
              </div>
              {/* end::Close */}
            </div>
            <div className="modal-body scroll-y">
              {isExportedInfo ?
                  <ModelsTable quote={quote} hideActions selection={ids} onSelectionChange={setIds}/> :
                  <ModelsTable quote={quote} hideActions hideSelections /> }
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { QuoteModelsModal };
