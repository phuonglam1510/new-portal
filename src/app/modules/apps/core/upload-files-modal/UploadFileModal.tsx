import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";

interface Props {
  onSave: (files: File[]) => void;
  onClose: () => void;
  loading: boolean;
}

const UploadFileModal: React.FC<Props> = ({
  onSave,
  onClose,
  loading = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

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
              <h2 className="fw-bolder">Chọn files để tải lên</h2>

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
            <div className="modal-body scroll-y mx-5 mx-xl-15">
              <label
                className="btn btn-primary align-self-center"
                htmlFor="upload-file-btn"
              >
                Choose Files
              </label>
              <input
                type="file"
                style={{ visibility: "hidden" }}
                id="upload-file-btn"
                name="files"
                onChange={(event) => {
                  if (event.target.files?.length) {
                    const list = [];
                    for (
                      let index = 0;
                      index < event.target.files.length;
                      index++
                    ) {
                      const element = event.target.files.item(index) as File;
                      list.push(element);
                    }
                    setFiles(list);
                    return;
                  }
                }}
                multiple
              />
              <div>
                {files.map((file) => (
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
                ))}
              </div>
              <div className="pt-10">
                <span className="form-text fs-6 text-muted ">
                  Max file size is 1MB per file.
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
                  Discard
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => onSave(files)}
                  disabled={!files.length || loading}
                >
                  <span className="indicator-label">
                    {loading ? "Uploading..." : "Upload"}
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

export { UploadFileModal };
