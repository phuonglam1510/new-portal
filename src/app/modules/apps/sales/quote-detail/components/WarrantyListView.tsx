import clsx from "clsx";
import moment from "moment";
import React from "react";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { QuoteWarrantyStatus } from "../../../../../enums/QuoteWarrantyStatus.enum";
import { formatMoney } from "../../../../../helpers/Number.helper";
import { QuoteWarrantyModel } from "../../../../../models/sales/QuoteWarranty.model";
import { useQuoteActionContext } from "../../quotes-list/core/QuoteActionProvider";
import { useQuoteDetailContext } from "../core/QuoteDetailProvider";
import { EditWarrantyModal } from "./warranty/EditWarrantyModal";

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
  const { quote } = useQuoteDetailContext();
  const { quote_items } = quote;
  const {
    issue,
    time_start_warranty,
    technical_in_charge,
    errors,
    warranty_process_time,
    cost_incurred,
    status,
    quote_item_id,
  } = item;
  return (
    <tr>
      <td className="text-dark fw-bolder">
        {quote_items.find((item) => item.id === quote_item_id)
          ?.asking_price_model || "-"}
      </td>
      <td>
        <a href="#" className="text-muted fw-bold text-hover-primary mb-1">
          {moment(time_start_warranty).format("DD/MM/YYYY")}
        </a>
        <span className="text-muted fw-bold d-block">
          {technical_in_charge}
        </span>
      </td>
      <td className="text-muted fw-bold">{issue}</td>
      <td className="text-muted fw-bold">{errors}</td>
      <td className="text-end fw-bold">{warranty_process_time || "-"} ngày</td>
      <td className="text-end fw-bold">{formatMoney(cost_incurred)}</td>
      <td className="text-end fw-bold">
        <div
          className={clsx(
            "badge",
            status === QuoteWarrantyStatus.Pending
              ? "badge-info"
              : "badge-success"
          )}
        >
          {status === QuoteWarrantyStatus.Pending ? "Chờ xử lý" : "Đã xong"}
        </div>
      </td>
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
  const { removeQuoteWarranty } = useQuoteActionContext();
  const { quote_warranty } = quote;
  const [visible, setVisible] = React.useState(false);
  const [editItem, setEditItem] = React.useState<QuoteWarrantyModel>(
    new QuoteWarrantyModel()
  );

  const onEdit = (index: number) => {
    const item = quote_warranty[index];
    setEditItem(item);
    setVisible(true);
  };

  const onRemove = (index: number) => {
    removeQuoteWarranty(quote.id || 0, quote_warranty[index].id).then(() => {
      loadQuoteDetail(quote.id?.toString() || "");
    });
  };

  const onAdd = () => {
    setVisible(true);
  };

  return (
    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div className="card-header cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Đơn bảo hành</h3>
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
                <th className="p-0 min-w-100px">Model</th>
                <th className="p-0 min-w-120px">
                  Thời gian tạo / Kỹ thuật viên
                </th>
                <th className="p-0 min-w-100px">Thông tin tiếp nhận</th>
                <th className="p-0 min-w-110px">Hiện trạng lỗi</th>
                <th className="p-0 min-w-50px">Thời gian xử lý</th>
                <th className="p-0 min-w-50px">Phí phát sinh</th>
                <th className="p-0 min-w-50px">Tình trạng</th>
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
      {visible && (
        <EditWarrantyModal onClose={() => setVisible(false)} item={editItem} />
      )}
    </div>
  );
}
