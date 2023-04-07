import React from "react";
import {Builder} from "builder-pattern";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {QuoteStatus} from "../../../../../enums/QuoteStatus.enum";
import {FileUploadResponse} from "../../../../../models/core/FileUploadResponse.type";
import {QuoteModel} from "../../../../../models/sales/Quote.model";
import {useListViewAddonContext} from "../../quotes-list/core/ListViewAddonProvider";
import {useQuoteDetailContext} from "../core/QuoteDetailProvider";
import {useCurrentUser} from "../../../core/CurrentUserProvider";
import {UserRole} from "../../../../../enums/UserRole.enum";

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

const FileLink = ({ file }: { file?: FileUploadResponse }) =>
  file ? (
    <a href={file?.file_url} rel="noreferrer" target="_blank">
      {file?.file_name}
    </a>
  ) : (
    <div>-</div>
  );

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
    sale_signature,
    head_signature,
    order_confirmation,
    exportedItemIds,
    quote_items,
  } = quote;
  const { contact_name, contact_email, contact_position, contact_phone, company } =
    contact || {};
  const { name } = sale || {};
  const isPending = status === QuoteStatus.Wating;
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
            <h3 className="fw-bolder m-0">Thông tin khách hàng</h3>
          </div>
          {user.role !== UserRole.Monitor &&
              <Link to="edit" className="btn btn-primary align-self-center">
                Chỉnh sửa
              </Link>
          }
        </div>

        <div className="card-body p-9">
          {/*{exportedItemIds.length > 0 && (*/}
          {/*  <InfoRow*/}
          {/*    text="Models đã xuất báo giá"*/}
          {/*    value={*/}
          {/*      <div>*/}
          {/*        <button*/}
          {/*          type="button"*/}
          {/*          className="btn btn-light-primary btn-sm me-3"*/}
          {/*          data-kt-menu-trigger="click"*/}
          {/*          data-kt-menu-placement="bottom-end"*/}
          {/*          onClick={() => open(quoteForDisplayModels)}*/}
          {/*        >*/}
          {/*          {exportedItemIds?.length} models*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*  />*/}
          {/*)}*/}
          {user.role !== UserRole.Monitor &&
              <>
                <InfoRow text="Người liên hệ" value={contact_name}/>
                <InfoRow text="Email" value={contact_email}/>
                <InfoRow text="Số điện thoại" value={contact_phone}/>
                <InfoRow text="Chức vụ" value={contact_position}/>
              </>
          }

          { user.role == UserRole.Monitor &&
              <InfoRow text="Tên Công Ty" value={company.company_name}/>
          }
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
          <InfoRow text="Địa chỉ giao hàng" value={delivery_address || "-"} />
          <InfoRow text="Ngày tạo" value={createdAtText} />
          <InfoRow text="Chất lượng hàng hoá" value={package_quality || "-"} />
          <InfoRow
            text="Chữ ký sales"
            value={<FileLink file={sale_signature} />}
          />
          <InfoRow
            text="Chữ ký thủ trưởng đơn vị"
            value={<FileLink file={head_signature} />}
          />
          <InfoRow
            text="Xác nhận đặt hàng"
            value={<FileLink file={order_confirmation} />}
          />
          <InfoRow text="Tạo bởi" value={name || "-"} />
        </div>
      </div>
    </>
  );
}
