import React from "react";

export interface FileUploaderProps {
  label: string;
  onChange?: (value: File[]) => void;
  disabled?: boolean;
  value?: File[];
}

const MultipleFilesUploader: React.FC<FileUploaderProps> = ({
  label,
  onChange = () => {},
  disabled = false,
  value,
}) => {
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
              multiple
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
                  onChange(list);
                  return;
                }
                onChange([] as any);
              }}
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

export { MultipleFilesUploader };
