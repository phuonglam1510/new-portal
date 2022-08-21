import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import { NumberHints } from "./NumberHints";
import { formatMoney } from "../helpers/Number.helper";

interface Props {
  formik: ReturnType<typeof useFormik>;
  disabled?: boolean;
  label: string;
  name: string;
  optional?: boolean;
  hasNumberHint?: boolean;
}

const FormInput: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
  optional,
  hasNumberHint,
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>

      <input
        placeholder={label}
        {...formik.getFieldProps(name)}
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 300)}
        name={name}
        value={
          hasNumberHint && !focused
            ? formatMoney(formik.values[name])
            : formik.values[name]
        }
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
      {hasNumberHint && focused && (
        <NumberHints
          value={formik.values[name]}
          onSelect={(newValue) =>
            formik.setFieldValue(name, (newValue || 0).toString(), true)
          }
        />
      )}
      <FormFieldError formik={formik} name={name} />
    </div>
  );
};

export { FormInput };
