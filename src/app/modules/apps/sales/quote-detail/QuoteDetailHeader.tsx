/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {KTSVG} from "../../../../../_metronic/helpers";
import {Link, useParams} from "react-router-dom";
// import { Dropdown1 } from "../../../../../_metronic/partials";
import {useLocation} from "react-router";
import {Routing} from "../../../../enums/Routing.enum";
import {useQuoteDetailContext} from "./core/QuoteDetailProvider";
import {QuoteStatus} from "../../../../enums/QuoteStatus.enum";
import {formatMoney} from "../../../../helpers/Number.helper";
import {useCurrentUser} from "../../../apps/core/CurrentUserProvider";
import {UserRole} from "../../../../enums/UserRole.enum";

const SummaryCard = ({ text, value }: { text: string; value: string }) => {
  return (
    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
      <div className="d-flex align-items-center">
        <div className="fs-2 fw-bolder">{value}</div>
      </div>

      <div className="fw-bold fs-6 text-gray-400">{text}</div>
    </div>
  );
};

const QuoteDetailHeader: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const user = useCurrentUser();
  const id = params.id as string;
  const { quote } = useQuoteDetailContext();
  const {
    quote_info,
    quote_exported_info,
    quote_items,
    status,
    contact,
    quote_term,
  } = quote;
  const { total_commission, total_selling_price_vat } = quote_info || {};
  const { quoteEffectText } = quote_term || {};
  const { contact_name, contact_email, contact_position } = contact || {};

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="#"
                    className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >
                    Báo giá #{quote.id}
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_upgrade_plan"
                  >
                    {status === QuoteStatus.Wating
                      ? "Chờ báo giá"
                      : status === QuoteStatus.Sold
                      ? "Bán hàng"
                      : "Đã báo giá"}
                  </a>
                </div>

                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <a
                    href="#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTSVG
                      path="/media/icons/duotune/communication/com006.svg"
                      className="svg-icon-4 me-1"
                    />
                    {contact_name}
                  </a>
                  <a
                    href="#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTSVG
                      path="/media/icons/duotune/general/gen018.svg"
                      className="svg-icon-4 me-1"
                    />
                    {contact_position}
                  </a>
                  <a
                    href="#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                  >
                    <KTSVG
                      path="/media/icons/duotune/communication/com011.svg"
                      className="svg-icon-4 me-1"
                    />
                    {contact_email}
                  </a>
                </div>
              </div>
              { user.role !== UserRole.Monitor &&
              <div className="d-flex my-4">
                <a
                  href="#"
                  className="btn btn-sm btn-danger me-2"
                  id="kt_user_follow_button"
                >
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr012.svg"
                    className="svg-icon-3 d-none"
                  />

                  <span className="indicator-label">Xóa</span>
                  <span className="indicator-progress">
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </a>
              </div>
              }
            </div>

            <div className="d-flex flex-wrap flex-stack">
              <div className="d-flex flex-column flex-grow-1 pe-8">
                <div className="d-flex flex-wrap">
                  <SummaryCard
                    text="Tổng (VAT)"
                    value={`${formatMoney(total_selling_price_vat)} VNĐ`}
                  />
                  <SummaryCard
                    text="Models"
                    value={quote_items?.length?.toString()}
                  />
                  <SummaryCard
                    text="Tổng com chi khách"
                    value={
                      total_commission
                        ? formatMoney(total_commission) + "VNĐ"
                        : "-"
                    }
                  />
                  <SummaryCard
                    text="Hiệu lực báo giá"
                    value={quoteEffectText || "-"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex overflow-auto h-55px">
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname ===
                    `/${Routing.SaleQuotes}/${id}/overview` && "active")
                }
                to={`/${Routing.SaleQuotes}/${id}/overview`}
              >
                Thông tin khách hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname ===
                    `/${Routing.SaleQuotes}/${id}/models` && "active")
                }
                to={`/${Routing.SaleQuotes}/${id}/models`}
              >
                Models báo giá
              </Link>
            </li>
            {!quote_exported_info &&
                <li className="nav-item">
                  <Link
                      className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname.startsWith(
                              `/${Routing.SaleQuotes}/${id}/info`
                          ) && "active")
                      }
                      to={`/${Routing.SaleQuotes}/${id}/info`}
                  >
                    Thông tin đơn hàng
                  </Link>
                </li>
            }
            {quote_exported_info && (
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname.startsWith(
                      `/${Routing.SaleQuotes}/${id}/export-info`
                    ) && "active")
                  }
                  to={`/${Routing.SaleQuotes}/${id}/export-info`}
                >
                  Thông tin báo giá
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname.startsWith(
                    `/${Routing.SaleQuotes}/${id}/attachments`
                  ) && "active")
                }
                to={`/${Routing.SaleQuotes}/${id}/attachments`}
              >
                Chứng từ đi kèm
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname.startsWith(
                    `/${Routing.SaleQuotes}/${id}/warranty`
                  ) && "active")
                }
                to={`/${Routing.SaleQuotes}/${id}/warranty`}
              >
                Đơn bảo hành
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname.startsWith(
                    `/${Routing.SaleQuotes}/${id}/term`
                  ) && "active")
                }
                to={`/${Routing.SaleQuotes}/${id}/term`}
              >
                Điều Khoản & Bảo Hành
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { QuoteDetailHeader };
