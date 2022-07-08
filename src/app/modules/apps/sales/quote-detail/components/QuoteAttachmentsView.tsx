import React from "react";
import { useQuoteDetailContext } from "../core/QuoteDetailProvider";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { UploadAttachmentAction } from "./attachments/UploadAttachmentAction";
import { useQuoteActionContext } from "../../quotes-list/core/QuoteActionProvider";
import { UsersListLoading } from "../../quotes-list/components/loading/UsersListLoading";

export function QuoteAttachmentsView() {
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { removeQuoteAttachment, loading } = useQuoteActionContext();
  const { quote_attachments } = quote;

  const onRemove = async (id: number) => {
    await removeQuoteAttachment(quote?.id || -1, id);
    loadQuoteDetail(quote.id?.toString() || "");
  };

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <KTSVG
                path="/media/icons/duotune/general/gen021.svg"
                className="svg-icon-1 position-absolute ms-6"
              />
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Tìm files"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <UploadAttachmentAction />
        </div>

        <div className="card-body p-9">
          <table
            id="kt_file_manager_list"
            className="table align-middle table-row-dashed fs-6 gy-5"
          >
            <thead>
              <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                <th className="w-10px pe-2">
                  <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </th>
                <th className="min-w-250px">Name</th>
                <th className="min-w-125px">Last Modified</th>
                <th className="w-125px"></th>
              </tr>
            </thead>
            <tbody className="fw-semibold text-gray-600">
              {quote_attachments.map((item) => (
                <tr key={item.attachment_id}>
                  <td>
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <KTSVG
                        path="/media/icons/duotune/files/fil012.svg"
                        className="svg-icon-2"
                      />
                      <a
                        href={item.attachment?.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-800 text-hover-primary mx-2"
                      >
                        {item.attachment?.file_name}
                      </a>
                    </div>
                  </td>
                  <td>
                    {new Date(item.attachment?.updated_at).toLocaleString()}
                  </td>
                  <td>
                    <div className="d-flex justify-content-end flex-shrink-0">
                      <a
                        onClick={() => onRemove(item.id)}
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
              ))}
            </tbody>
          </table>
          {loading && <UsersListLoading />}

          {quote_attachments.length === 0 && (
            <div className="text-gray-500 fw-bold fs-4 w-100 pt-10 text-center">
              Chọn "Thêm" để upload thêm chứng từ
            </div>
          )}
        </div>
      </div>
    </>
  );
}
