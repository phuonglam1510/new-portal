import React, { useMemo, useState } from "react";

export interface FileUploaderProps {
  label: string;
  onChange?: (value: File | null) => void;
  disabled?: boolean;
  value?: string | File;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  onChange = () => {},
  disabled = false,
  value,
}) => {
  const [localImage, setLocalImage] = useState("");
  const imageUrl = useMemo(() => {
    if (typeof value === "string") {
      return value;
    }
    return null;
  }, [value]);

  return (
    <>
      <div className="fv-row mb-7">
        <label className="d-block fw-bold fs-6 mb-5">{label}</label>

        <div data-kt-image-input="true">
          <label
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <input
              type="file"
              disabled={disabled}
              name="avatar"
              onChange={(event) =>
                onChange(event.target.files?.item(0) || null)
              }
              accept=".png, .jpg, .jpeg, .pdf"
            />
            <input type="hidden" name="avatar_remove" />
          </label>
        </div>

        <div className="form-text">
          Allowed file types: png, jpg, jpeg, pdf.
        </div>
      </div>
    </>
  );
};

export { FileUploader };
