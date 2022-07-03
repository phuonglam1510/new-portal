import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { QuoteStatus } from "../../../../../enums/QuoteStatus.enum";
import { useQuoteDetailContext } from "../core/QuoteDetailProvider";

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

export function Overview() {
  const { quote } = useQuoteDetailContext();
  const {
    status,
    createdAtText,
    contact,
    statusName,
    typeName,
    sale,
    package_quality,
    delivery_address,
  } = quote;
  const { contact_name, contact_email, contact_position, contact_phone } =
    contact || {};
  const { name } = sale || {};
  const isPending = status === QuoteStatus.Wating;

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Thông tin báo giá</h3>
          </div>

          <Link to="edit" className="btn btn-primary align-self-center">
            Chỉnh sửa
          </Link>
        </div>

        <div className="card-body p-9">
          <InfoRow text="Người liên hệ" value={contact_name} />
          <InfoRow text="Email" value={contact_email} />
          <InfoRow text="Số điện thoại" value={contact_phone} />
          <InfoRow text="Chức vụ" value={contact_position} />

          <InfoRow
            text="Trạng thái"
            value={
              <span
                className={clsx(
                  "badge",
                  isPending ? "badge-warning" : "badge-success"
                )}
              >
                {statusName}
              </span>
            }
          />
          <InfoRow
            text="Loại đơn hàng"
            value={<span className="badge badge-success">{typeName}</span>}
          />
          <InfoRow text="Chất lượng hàng hoá" value={package_quality || "-"} />
          <InfoRow text="Địa chỉ giao hàng" value={delivery_address || "-"} />
          <InfoRow text="Ngày tạo" value={createdAtText} />
          <InfoRow text="Tạo bởi" value={name || "-"} />
        </div>
      </div>
    </>
  );
}
