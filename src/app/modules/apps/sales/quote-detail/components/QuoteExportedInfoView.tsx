import React from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {quoteOrderStatusLabel} from "../../../../../constants/quoteOrderStatusLabel.constant";
import {OrderStatus} from "../../../../../enums/OrderStatus.enum";
import {formatMoney} from "../../../../../helpers/Number.helper";
import {QuoteInfoModel} from "../../../../../models/sales/QuoteInfo.model";
import {Builder} from "builder-pattern";
import {QuoteModel} from "../../../../../models/sales/Quote.model";
import {useListViewAddonContext} from "../../quotes-list/core/ListViewAddonProvider";
import {useCurrentUser} from "../../../core/CurrentUserProvider";
import {UserRole} from "../../../../../enums/UserRole.enum";
import {QuoteExportedInfoModel} from "../../../../../models/sales/QuoteExportedInfo.model";

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

export function QuoteExportedInfoView({
  readOnly,
  info,
  quote,
}: {
  readOnly?: boolean;
  info?: QuoteExportedInfoModel;
  quote: QuoteModel
}) {
  const {
    prepay,
    po_number,
    status,
    total_selling_price_vat,
    total_selling_price_no_vat,
    total_net_unit_price_no_vat,
    total_net_price_no_vat,
    invoice_number,
    extra_cost,
    remain,
    notes,
  } = info || {};
  const { quote_items,
    exportedItemIds
  } = quote;
  const isDone = status === OrderStatus.CompletePayment;
  const { open } = useListViewAddonContext();
  const exportedItems = quote_items.filter((item) =>
      exportedItemIds.includes(item.id)
  );
  const user = useCurrentUser();
  const quoteForDisplayModels = Builder(QuoteModel, { ...quote })
      .quote_items(exportedItems)
      .build();

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">
              Thông tin {readOnly ? "báo giá" : "đơn hàng"}
            </h3>
          </div>

          {!readOnly && user.role !== UserRole.Monitor && (
            <Link to="edit" className="btn btn-primary align-self-center">
              Chỉnh sửa
            </Link>
          )}
        </div>

        <div className="card-body p-9">
          {exportedItemIds.length > 0 && (
              <InfoRow
                  text="Models đã xuất báo giá"
                  value={
                    <div>
                      <button
                          type="button"
                          className="btn btn-light-primary btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          onClick={() => open(quoteForDisplayModels)}
                      >
                        {exportedItemIds?.length} models
                      </button>
                    </div>
                  }
              />
          )}
          <InfoRow text="Số PO" value={po_number || "-"} />
          <InfoRow text="Số hoá đơn" value={invoice_number || "-"} />
          <InfoRow
            text="Chi phí vận chuyển, phụ phí phát sinh"
            value={formatMoney(extra_cost)}
          />
          <InfoRow
            text="Tổng đơn giá net không có VAT"
            value={formatMoney(total_net_unit_price_no_vat)}
          />
          <InfoRow
            text="Tổng Thành tiền giá net không có VAT"
            value={formatMoney(total_net_price_no_vat)}
          />
          <InfoRow
            text="Tổng giá bán chưa bao gồm VAT"
            value={formatMoney(total_selling_price_no_vat)}
          />
          <InfoRow
            text="Tổng giá bán bao gồm VAT"
            value={formatMoney(total_selling_price_vat)}
          />

          <InfoRow text="Trả trước" value={prepay ? prepay + "%" : "-"} />
          <InfoRow text="Còn lại" value={formatMoney(remain)} />

          <InfoRow
            text="Trạng thái"
            value={
              <span
                className={clsx(
                  "badge",
                  isDone ? "badge-success" : "badge-warning"
                )}
              >
                {quoteOrderStatusLabel[status || OrderStatus.DeliveryNotYetDue]}
              </span>
            }
          />

          <InfoRow text="Ghi chú" value={notes || "-"} />
        </div>
      </div>
    </>
  );
}
