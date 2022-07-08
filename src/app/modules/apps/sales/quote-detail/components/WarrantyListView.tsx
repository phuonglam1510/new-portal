import React from "react";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { QuoteWarrantyModel } from "../../../../../models/sales/QuoteWarranty.model";
import { useQuoteActionContext } from "../../quotes-list/core/QuoteActionProvider";
import { useQuoteDetailContext } from "../core/QuoteDetailProvider";

interface ItemProps {
  item: QuoteWarrantyModel;
  index: number;
  onEdit: () => any;
  onRemove: () => any;
}

export const RowItem: React.FC<ItemProps> = ({
  item,
  index,
  onEdit,
  onRemove,
}) => {
  const {
    issue,
    time_start_warranty,
    technical_in_charge,
    errors,
    warranty_process_time,
    cost_incurred,
    status,
  } = item;
  return (
    <tr>
      <td>
        <a
          href="#"
          className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
        >
          {time_start_warranty}
        </a>
        <span className="text-muted fw-bold d-block">{issue}</span>
      </td>
      <td className="text-muted fw-bold">{technical_in_charge}</td>
      <td className="text-muted fw-bold">{errors}</td>
      <td className="text-end fw-bold">{warranty_process_time}</td>
      <td className="text-end fw-bold">{cost_incurred}</td>
      <td className="text-end fw-bold">{status}</td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            onClick={onEdit}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTSVG
              path="/media/icons/duotune/art/art005.svg"
              className="svg-icon-3"
            />
          </a>
          <a
            onClick={onRemove}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
          >
            <KTSVG
              path="/media/icons/duotune/general/gen027.svg"
              className="svg-icon-3"
            />
          </a>
        </div>
      </td>
    </tr>
  );
};

export function WarrantyListView() {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { quote_warranty } = quote;
  const [visible, setVisible] = React.useState(false);
  const { editQuoteItem, createQuoteItem } = useQuoteActionContext();

  const onEdit = (index: number) => {
    const item = quote_warranty[index];
    setVisible(true);
  };

  const onRemove = (index: number) => {
    // delete model
  };

  const onAdd = () => {
    setVisible(true);
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
              {quote_warranty.map((item: QuoteWarrantyModel, index: number) => (
                <RowItem
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={() => onRemove(index)}
                  onEdit={() => onEdit(index)}
                />
              ))}
            </tbody>
          </table>
          {quote_warranty.length === 0 && (
            <div className="text-gray-500 fw-bold fs-4 w-100 pt-10 text-center">
              Chọn "Thêm" để tạo đơn bảo hành
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
