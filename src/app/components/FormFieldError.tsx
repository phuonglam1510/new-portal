import React from "react";
import { useFormik } from "formik";

interface Props {
  formik: ReturnType<typeof useFormik>;
  name: string;
}

const FormFieldError: React.FC<Props> = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] && formik.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{formik.errors[name]}</span>
          </div>
        </div>
      )}
    </>
  );
};

export { FormFieldError };
