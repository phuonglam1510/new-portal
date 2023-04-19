import React from "react";
import {ExportHistoryModel} from "../../../../../../models/sales/ExportHistoryModel.model";
import moment from "moment/moment";
import clsx from "clsx";
import {quoteOrderStatusLabel} from "../../../../../../constants/quoteOrderStatusLabel.constant";
import {OrderStatus} from "../../../../../../enums/OrderStatus.enum";

type Props = {
  histories: ExportHistoryModel[];
  type: string;
  poDate: Date | undefined;
};
const InfoRow = ({ text, value }: { text: string; value: any }) => {
  return (
      <div className="row mb-7">
        <label className="col-lg-4 fw-bold text-muted">{text}</label>
        <div className="col-lg-8">
          <span className="fw-bolder fs-6 text-dark">{value}</span>
        </div>
      </div>
  );
};

export const ExportedModelTable: React.FC<Props> = ({ histories, type, poDate }) => {
  let items: ExportHistoryModel[] = histories.filter((history) => history.type == type);
  return (
    <div className="table-responsive">
      <h3 className="fw-bolder text-center">Lịch Sử Xuất { type == "warranty" ? "Giấy Bảo Hành" : "Biên Bản Giao Hàng"}</h3>
      <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
        <thead>
          <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
            <th className="p-2 min-w-120px">Model</th>
            <th className="p-2 min-w-120px">Số PO</th>
            <th className="p-2 min-w-100px">Ngày Xuất</th>
            { type == "delivery" &&
                <th className="p-2 min-w-100px">Trạng Thái</th>
            }
          </tr>
        </thead>
        <tbody className="text-gray-600 fw-bold">
          {items.map((history: ExportHistoryModel, index: number) => (
            <tr key={`${history.type}${history.item_id}`}>
                <td>{ history.item.asking_price_model}</td>
                <td>{ history.po_number}</td>
                <td>{ moment(history.created_at).format("DD/MM/YYYY hh:mm") }</td>
                { type == "delivery" && <td>
                    <span
                              className={clsx(
                                  "badge",
                                  history.item.current_delivery_status == OrderStatus.DeliveryNotYetDue ? "badge-success" : "badge-warning"
                              )}
                          >
                        {quoteOrderStatusLabel[history.item.current_delivery_status]}
                    </span>
                </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
