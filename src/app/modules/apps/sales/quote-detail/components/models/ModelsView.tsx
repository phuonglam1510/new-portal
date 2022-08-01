import React, { useState } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { showError } from "../../../../../../helpers/Error.helper";
import { toast } from "../../../../../../helpers/Toast.helper";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { useGlobalContext } from "../../../../core/GlobalProvider";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useQuoteModalContext } from "../../../quotes-list/core/QuoteModalProvider";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";
import { ModelsImportModal } from "./ModelsImportModal";
import { ModelsTable } from "./ModelsTable";

let editIndex: number | null = null;

export function ModelsView() {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { quote_items } = quote;
  const { open, close, setLoading } = useQuoteModalContext();
  const {
    editQuoteItem,
    createQuoteItem,
    exportPdf,
    exportExcel,
    loading,
    removeQuoteItem,
  } = useQuoteActionContext();
  const { confirm } = useGlobalContext();
  const [ids, setIds] = useState<number[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const onSave = async (newItem: QuoteItemModel) => {
    let done: any = false;
    setLoading(true);
    if (editIndex !== null) {
      done = await editQuoteItem(quote.id || 0, newItem);
    } else {
      done = await createQuoteItem(quote.id || 0, newItem);
    }
    setLoading(false);
    if (done) {
      toast(
        `${editIndex !== null ? "Cập nhật" : "Tạo"} model ${
          newItem.asking_price_model
        } thành công!`
      );
      loadQuoteDetail(quote.id?.toString() || "");
      editIndex = null;
      close();
    }
  };

  const onEdit = (index: number) => {
    const item = quote_items[index];
    editIndex = index;
    open(item, onSave);
  };

  const onRemove = (index: number) => {
    const item = quote_items[index];
    confirm({
      title: "Xoá model",
      message: `Bạn có chắc muốn xoá model ${item.asking_price_model} không?`,
      onOk: () =>
        removeQuoteItem(quote.id || 0, item.id).then(() => {
          loadQuoteDetail(quote.id?.toString() || "");
          toast(`Xoá model ${item.asking_price_model} thành công!`);
        }),
    });
  };

  const onAdd = () => {
    open(new QuoteItemModel(), onSave);
  };

  const onExport = () => {
    if (!quote.quote_info) {
      showError(
        "Không thể xuất báo giá vì chưa có thông tin đơn hàng. Vui lòng cập nhật."
      );
      return;
    }
    exportPdf(quote.id || 0, ids).then(() => setIds([]));
  };

  return (
    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div className="card-header cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Models báo giá</h3>
        </div>

        {ids.length ? (
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-light-primary m-4"
              onClick={onExport}
              disabled={loading}
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr078.svg"
                className="svg-icon-2"
              />
              {loading
                ? "Đang xuất PDF..."
                : `Xuất báo giá ${ids.length} models`}
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-light-success m-4"
              onClick={() => setVisible(true)}
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr076.svg"
                className="svg-icon-2"
              />
              Import
            </button>
            <button
              type="button"
              className="btn btn-light-primary m-4"
              onClick={() => exportExcel(quote.id || 0)}
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr078.svg"
                className="svg-icon-2"
              />
              {loading ? "Đang xuất file Excel..." : `Export`}
            </button>
            <button
              type="button"
              className="btn btn-primary m-4"
              onClick={onAdd}
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr075.svg"
                className="svg-icon-2"
              />
              Thêm
            </button>
          </div>
        )}
      </div>

      <div className="card-body p-9">
        <ModelsTable
          quote={quote}
          onEdit={onEdit}
          onRemove={onRemove}
          selection={ids}
          onSelectionChange={setIds}
        />
        {visible && <ModelsImportModal onClose={() => setVisible(false)} />}
      </div>
    </div>
  );
}
