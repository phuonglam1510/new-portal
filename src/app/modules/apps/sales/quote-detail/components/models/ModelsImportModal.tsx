import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";

interface Props {
  onClose: () => void;
}

const ModelsImportModal: React.FC<Props> = ({ onClose }) => {
  const [file, setFile] = useState<File>();
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { loading, importFile } = useQuoteActionContext();
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const onImport = async () => {
    if (file) {
      const done = await importFile(quote.id || 0, file);
      if (done) {
        onClose();
        loadQuoteDetail(quote.id?.toString() || "");
      }
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="fw-bolder">Nhập Models bằng File</h2>

              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                onClick={onClose}
                style={{ cursor: "pointer" }}
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon-1"
                />
              </div>
            </div>
            <div className="modal-body scroll-y">
              <div className="text-muted fw-bold pb-4 fs-5">
                Tải file excel mẫu tại{" "}
                <a target="_blank" href="/file/model-import.xlsx">
                  đây
                </a>
              </div>
              <label
                className="btn btn-primary align-self-center"
                htmlFor="upload-file-btn"
              >
                Chọn file excel để import
              </label>
              <input
                type="file"
                style={{ visibility: "hidden" }}
                id="upload-file-btn"
                name="files"
                accept=".xls, .xlsx"
                onChange={(event) => {
                  if (event.target.files && event.target.files.item(0)) {
                    setFile(event.target.files?.item(0) as File);
                    return;
                  }
                }}
              />
              <div>
                {file && (
                  <div
                    className="d-flex px-5 py-3 my-3 flex-stack"
                    style={{ backgroundColor: "#e9e9e9", borderRadius: 5 }}
                    key={file.name}
                  >
                    <div className="text-gray-600 fw-bold">
                      {file.name}{" "}
                      <span className="text-gray-800">
                        ({file.size / 1000} kb)
                      </span>
                    </div>
                    <div
                      className="btn btn-icon btn-sm btn-active-icon-primary"
                      data-kt-users-modal-action="close"
                      onClick={onClose}
                      style={{ cursor: "pointer" }}
                    >
                      <KTSVG
                        path="/media/icons/duotune/arrows/arr061.svg"
                        className="svg-icon-1"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <span className="form-text fs-6 text-muted ">
                  Dung lượng tối đa 1MB.
                </span>
              </div>

              <div className="text-end pt-15">
                <button
                  type="reset"
                  onClick={onClose}
                  className="btn btn-light me-3"
                  data-kt-users-modal-action="cancel"
                  disabled={loading}
                >
                  Huỷ bỏ
                </button>

                <button
                  className="btn btn-primary"
                  onClick={onImport}
                  disabled={!file || loading}
                >
                  <span className="indicator-label">
                    {loading ? "Đang tải file..." : "Nhập"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { ModelsImportModal };
