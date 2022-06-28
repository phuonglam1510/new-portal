import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import { FileUploader, FileUploaderProps } from "./FileUploader";

interface Props extends FileUploaderProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormFileUploader: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
}) => {
  return (
    <>
      <FileUploader
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

export { FormFileUploader };
