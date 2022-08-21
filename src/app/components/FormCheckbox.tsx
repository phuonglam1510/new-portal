import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";

interface Props {
  formik: ReturnType<typeof useFormik>;
  disabled?: boolean;
  label: string;
  name: string;
}

const FormCheckbox: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
}) => {
  return (
    <div className="fv-row mb-7">
      <div className="d-flex align-items-center">
        <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
          <input
            className="form-check-input"
            {...formik.getFieldProps(name)}
            type="checkbox"
            data-kt-check={formik.values[name]}
            data-kt-check-target="#kt_table_users .form-check-input"
            disabled={formik.isSubmitting || disabled}
            checked={formik.values[name]}
          />
        </div>
        <label className="fw-bold fs-6">{label}</label>
      </div>

      <FormFieldError formik={formik} name={name} />
    </div>
  );
};

export { FormCheckbox };
