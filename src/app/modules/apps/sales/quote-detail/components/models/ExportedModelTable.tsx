import React from "react";
import {ExportHistoryModel} from "../../../../../../models/sales/ExportHistoryModel.model";
import moment from "moment/moment";

type Props = {
  histories: ExportHistoryModel[];
  type: string;
};

export const ExportedModelTable: React.FC<Props> = ({ histories, type }) => {
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
          </tr>
        </thead>
        <tbody className="text-gray-600 fw-bold">
          {items.map((history: ExportHistoryModel, index: number) => (
            <tr key={`${history.type}${history.item_id}`}>
                <td>{ history.item.asking_price_model}</td>
                <td>{ history.po_number}</td>
                <td>{ moment(history.updated_at).format("DD/MM/YYYY hh:mm") }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
