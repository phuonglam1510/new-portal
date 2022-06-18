import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { toAbsoluteUrl } from "../../_metronic/helpers";

export interface ImageUploaderProps {
  label: string;
  onChange?: (value: File | null) => void;
  disabled?: boolean;
  value?: string | File;
}

const blankImg = toAbsoluteUrl("/media/svg/avatars/blank.svg");

const ImageUploader: React.FC<ImageUploaderProps> = ({
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

  const getBase64 = () => {
    if (!value || !(value as File).name) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(value as File);
    reader.onload = function () {
      console.log(reader.result);
      setLocalImage(reader.result as string);
    };
    reader.onerror = function (error) {
      console.log("Error when load local image: ", error);
    };
  };

  React.useEffect(() => {
    getBase64();
  }, [value]);

  return (
    <>
      <div className="fv-row mb-7">
        <label className="d-block fw-bold fs-6 mb-5">{label}</label>

        <div
          className={clsx(
            `image-input image-input-outline w-125px h-125px`,
            !(imageUrl || localImage) && "image-input-empty"
          )}
          data-kt-image-input="true"
          style={{ backgroundImage: `url('${blankImg}')` }}
        >
          {(imageUrl || localImage) && (
            <div
              className="image-input-wrapper w-125px h-125px"
              style={{ backgroundImage: `url('${localImage || imageUrl}')` }}
            ></div>
          )}

          <label
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <i className="bi bi-pencil-fill fs-7"></i>

            <input
              type="file"
              disabled={disabled}
              name="avatar"
              onChange={(event) =>
                onChange(event.target.files?.item(0) || null)
              }
              accept=".png, .jpg, .jpeg"
            />
            <input type="hidden" name="avatar_remove" />
          </label>

          <span
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="cancel"
            data-bs-toggle="tooltip"
            title="Cancel avatar"
          >
            <i className="bi bi-x fs-2"></i>
          </span>

          <span
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="remove"
            data-bs-toggle="tooltip"
            title="Remove avatar"
          >
            <i className="bi bi-x fs-2"></i>
          </span>
        </div>

        <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
      </div>
    </>
  );
};

export { ImageUploader };
