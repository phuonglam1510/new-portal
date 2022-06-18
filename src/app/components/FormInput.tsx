import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";

interface Props {
  formik: ReturnType<typeof useFormik>;
  disabled?: boolean;
  label: string;
  name: string;
  optional?: boolean;
}

const FormInput: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
  optional,
}) => {
  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>

      <input
        placeholder={label}
        {...formik.getFieldProps(name)}
        type="text"
        name={name}
        className={clsx(
          "form-control form-control-solid mb-3 mb-lg-0",
          { "is-invalid": formik.touched[name] && formik.errors[name] },
          {
            "is-valid": formik.touched[name] && !formik.errors[name],
          }
        )}
        autoComplete="off"
        disabled={formik.isSubmitting || disabled}
      />
      <FormFieldError formik={formik} name={name} />
    </div>
  );
};

export { FormInput };
