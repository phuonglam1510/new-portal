import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import { Dropdown, DropdownProps } from "./Dropdown";

interface Props extends DropdownProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormDropdown: React.FC<Props> = ({
  formik,
  label,
  name,
  items,
  ...rest
}) => {
  return (
    <div className="fv-row mb-7">
      <Dropdown
        items={items}
        label={label}
        selectProps={formik.getFieldProps(name)}
        {...rest}
      />
      <FormFieldError formik={formik} name={name} />
    </div>
  );
};

export { FormDropdown };
