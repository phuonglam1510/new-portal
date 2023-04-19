import React, {useState} from "react";
import { QuoteModel } from "../../../../../../models/sales/Quote.model";
import { QuoteItemModel } from "../../../../../../models/sales/QuoteItem.model";
import { QuoteRowItem } from "../../../shared/QuoteRowItem";

type Props = {
  onEdit?: (index: number) => void;
  onRemove?: (index: number) => void;
  quote: QuoteModel;
  hideSelections?: boolean;
  selection?: number[];
  onSelectionChange?: (value: number[]) => any;
  hideActions?: boolean;
  isExportedTable?: boolean;
};

export const ModelsTable: React.FC<Props> = ({
  onEdit = () => true,
  onRemove = () => true,
  quote,
  selection = [],
  onSelectionChange = () => true,
  hideActions,
  hideSelections,
  isExportedTable =  false,
}) => {
  const { quote_items, quote_exported_info, export_history } = quote;
  const isAllSelected = selection.length === quote_items.length;
  // if (quote.quote_exported_info && quote.quote_exported_info.quote_exported_model) {
  //   selection = JSON.parse(quote.quote_exported_info.quote_exported_model);
  //   selection = selection?.map(select => parseInt(select as unknown as string));
  // }
  return (
    <div className="table-responsive">
      <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
        <thead>
          <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
            {!hideSelections && (
              <th className="pb-2 w-10px">
                <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() =>
                      !isAllSelected
                        ? onSelectionChange(quote_items.map((item) => item.id))
                        : onSelectionChange([])
                    }
                  />
                </div>
              </th>
            )}
            <th className="p-2 min-w-120px">Model</th>
            {
              isExportedTable && <th className="p-2 min-w-120px">Trạng Thái</th>
            }
            <th className="p-2 min-w-100px">Hãng sản xuất</th>
            <th className="p-2 min-w-100px">Inter</th>
            <th className="p-2 min-w-110px">Số lượng</th>
            <th className="p-2 min-w-50px">Đơn giá</th>
            <th className="p-2 min-w-50px">Thành tiền (VAT)</th>
            <th className="p-2 min-w-50px">VAT (%)</th>
            <th className="p-2 min-w-50px">Commision (%)</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 fw-bold">
          {quote_items.map((item: QuoteItemModel, index: number) => (
            <QuoteRowItem
              showSelection={!hideSelections}
              selected={selection.includes(item.id)}
              onSelect={() => {
                if (selection.includes(item.id)) {
                  onSelectionChange(selection.filter((i) => i !== item.id));
                } else {
                  onSelectionChange([...selection, item.id]);
                }
              }}
              key={item.asking_price_model}
              item={item}
              index={index}
              onRemove={() => onRemove(index)}
              onEdit={() => onEdit(index)}
              hideActions={hideActions}
              isExportedTable={isExportedTable}
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
  );
};
