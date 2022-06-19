import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";

export interface DropdownItemProps {
  value: string | number;
  text: string;
  disabled?: boolean;
}

interface Props {
  items: DropdownItemProps[];
  formik: ReturnType<typeof useFormik>;
  disabled?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  optional?: boolean;
}

const FormDropdown: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
  optional,
  placeholder = "Select...",
  items,
}) => {
  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>
      <div className="mb-3 mb-lg-0">
        <select
          className="form-select form-select-solid form-select-lg"
          {...formik.getFieldProps(name)}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {items.map((item) => (
            <option
              disabled={item.disabled}
              key={item.value}
              value={item.value}
            >
              {item.text}
            </option>
          ))}
        </select>
        <FormFieldError formik={formik} name={name} />
      </div>
    </div>
  );
};

export { FormDropdown };
