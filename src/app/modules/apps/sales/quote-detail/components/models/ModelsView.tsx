import React, { useState } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useQuoteModalContext } from "../../../quotes-list/core/QuoteModalProvider";
import { QuoteRowItem } from "../../../shared/QuoteRowItem";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";

let editIndex: number | null = null;

export function ModelsView() {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { quote_items } = quote;
  const { open, close, setLoading } = useQuoteModalContext();
  const { editQuoteItem, createQuoteItem, exportPdf, loading } =
    useQuoteActionContext();
  const [ids, setIds] = useState<number[]>([]);
  const isAllSelected = ids.length === quote_items.length;

  const onSave = async (newItem: QuoteItemModel) => {
    console.log(newItem);
    setLoading(true);
    if (editIndex !== null) {
      await editQuoteItem(quote.id || 0, newItem);
    } else {
      await createQuoteItem(quote.id || 0, newItem);
    }
    setLoading(false);
    loadQuoteDetail(quote.id?.toString() || "");
    editIndex = null;
    close();
  };

  const onEdit = (index: number) => {
    const item = quote_items[index];
    editIndex = index;
    open(item, onSave);
  };

  const onRemove = (index: number) => {
    // delete model
  };

  const onAdd = () => {
    open(new QuoteItemModel(), onSave);
  };

  const onExport = () => {
    exportPdf(quote.id || 0, ids);
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
          <button type="button" className="btn btn-primary m-4" onClick={onAdd}>
            <KTSVG
              path="/media/icons/duotune/arrows/arr075.svg"
              className="svg-icon-2"
            />
            Thêm
          </button>
        )}
      </div>

      <div className="card-body p-9">
        <div className="table-responsive mt-7">
          <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
            <thead>
              <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                <th className="pb-2 w-10px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={() =>
                        !isAllSelected
                          ? setIds(quote_items.map((item) => item.id))
                          : setIds([])
                      }
                    />
                  </div>
                </th>
                <th className="p-2 min-w-120px">Model</th>
                <th className="p-2 min-w-100px">Hãng sản xuất</th>
                <th className="p-2 min-w-110px">Số lượng</th>
                <th className="p-2 min-w-50px">Đơn giá</th>
                <th className="p-2 min-w-50px">Commision (%)</th>
                <th className="p-2 min-w-50px">VAT (%)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-bold">
              {quote_items.map((item: QuoteItemModel, index: number) => (
                <QuoteRowItem
                  showSelection
                  selected={ids.includes(item.id)}
                  onSelect={() => {
                    if (ids.includes(item.id)) {
                      setIds(ids.filter((i) => i !== item.id));
                    } else {
                      setIds([...ids, item.id]);
                    }
                  }}
                  key={item.asking_price_model}
                  item={item}
                  index={index}
                  onRemove={() => onRemove(index)}
                  onEdit={() => onEdit(index)}
                />
              ))}
            </tbody>
          </table>
          {quote_items.length === 0 && (
            <div className="text-gray-500 fw-bold fs-4 w-100 pt-10 text-center">
              Chọn "Thêm" để tạo model báo giá
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
