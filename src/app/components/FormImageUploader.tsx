import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import { ImageUploader, ImageUploaderProps } from "./ImageUploader";

interface Props extends ImageUploaderProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormImageUploader: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
}) => {
  return (
    <>
      <ImageUploader
        label={label}
        disabled={disabled}
        onChange={(value) => {
          formik.setFieldValue(name, value, true);
        }}
        value={formik.values[name]}
      />
      <FormFieldError formik={formik} name={name} />
    </>
  );
};

export { FormImageUploader };
