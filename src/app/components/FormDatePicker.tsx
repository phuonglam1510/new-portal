import React from "react";
import { useFormik } from "formik";
import { FormFieldError } from "./FormFieldError";
import { DatePicker, DatePickerProps } from "./DatePicker";

interface Props extends DatePickerProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormDatePicker: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
  onChange: onValueChange,
  ...rest
}) => {
  return (
    <>
      <DatePicker
        {...rest}
        label={label}
        disabled={disabled}
        onChange={(value) => {
          formik.setFieldValue(name, value, true);
          if (onValueChange) {
            onValueChange(value);
          }
        }}
        value={formik.values[name]}
      />
      <FormFieldError formik={formik} name={name} />
    </>
  );
};

export { FormDatePicker };
