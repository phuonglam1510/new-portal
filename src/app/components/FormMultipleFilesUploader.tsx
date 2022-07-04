import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import {
  MultipleFilesUploader,
  FileUploaderProps,
} from "./MultipleFilesUploader";

interface Props extends FileUploaderProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormMultipleFilesUploader: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
}) => {
  return (
    <>
      <MultipleFilesUploader
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

export { FormMultipleFilesUploader };
