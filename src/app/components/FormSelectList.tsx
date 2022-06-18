import React from "react";
import { useFormik } from "formik";
import { SelectList, SelectListProps } from "./SelectList";
import { FormFieldError } from "./FormFieldError";

interface Props extends SelectListProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormSelectList: React.FC<Props> = ({
  formik,
  disabled = false,
  label,
  name,
  items,
}) => {
  return (
    <>
      <SelectList
        items={items}
        label={label}
        disabled={disabled}
        inputProps={formik.getFieldProps(name)}
        onChange={(value) => {
          formik.setFieldValue(name, value, true);
        }}
        value={formik.values[name]}
      />
      <FormFieldError formik={formik} name={name} />
    </>
  );
};

export { FormSelectList };
