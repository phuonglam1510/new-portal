import React from "react";
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
  const { editQuoteItem, createQuoteItem } = useQuoteActionContext();

  const onSave = async (newItem: QuoteItemModel) => {
    console.log(newItem);
    setLoading(true);
    if (editIndex !== null) {
      // edit model
      await editQuoteItem(quote.id || 0, newItem);
    } else {
      // add new
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

  return (
    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div className="card-header cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Models báo giá</h3>
        </div>

        <button type="button" className="btn btn-primary m-4" onClick={onAdd}>
          <KTSVG
            path="/media/icons/duotune/arrows/arr075.svg"
            className="svg-icon-2"
          />
          Thêm
        </button>
      </div>

      <div className="card-body p-9">
        <div className="table-responsive mt-7">
          <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
            <thead>
              <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                <th className="p-0 min-w-120px">Model</th>
                <th className="p-0 min-w-100px">Hãng sản xuất</th>
                <th className="p-0 min-w-110px">Số lượng</th>
                <th className="p-0 min-w-50px">Đơn giá</th>
                <th className="p-0 min-w-50px">Commision (%)</th>
                <th className="p-0 min-w-50px">VAT (%)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-bold">
              {quote_items.map((item: QuoteItemModel, index: number) => (
                <QuoteRowItem
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
