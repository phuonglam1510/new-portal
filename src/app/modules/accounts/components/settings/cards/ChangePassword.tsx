/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormInput } from "../../../../../components/FormInput";
import { ChangePasswordForm } from "../../../../../models/users/ChangePassword.interface";
import { updatePassword } from "../../../../apps/user-management/users-list/core/_requests";
import { toast } from "../../../../../helpers/Toast.helper";
import { showError } from "../../../../../helpers/Error.helper";

const deactivateAccountSchema = Yup.object().shape({
  old_password: Yup.string().required("Field is required"),
  new_password: Yup.string().required("Field is required"),
  confirm_password: Yup.string().required("Field is required"),
  confirm: Yup.boolean().oneOf([true], "Please check the box"),
});

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik<ChangePasswordForm>({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
      confirm: false,
    },
    validationSchema: deactivateAccountSchema,
    onSubmit: (values) => {
      setLoading(true);
      updatePassword(values)
        .then(() => {
          toast("New password has been successfully updated!");
          formik.resetForm();
        })
        .catch((err) => {
          showError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div className="card">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_deactivate"
        aria-expanded="true"
        aria-controls="kt_account_deactivate"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Đổi mật khẩu</h3>
        </div>
      </div>

      <div id="kt_account_deactivate" className="collapse show">
        <form
          onSubmit={formik.handleSubmit}
          id="kt_account_deactivate_form"
          className="form"
        >
          <div className="card-body border-top p-9">
            <FormInput
              formik={formik as any}
              name="old_password"
              label="Mật khẩu hiện tại"
            />
            <FormInput
              formik={formik as any}
              name="new_password"
              label="Mật khẩu mới"
            />
            <FormInput
              formik={formik as any}
              name="confirm_password"
              label="Nhập lại mật khẩu mới"
            />
            <div className="form-check form-check-solid fv-row">
              <input
                className="form-check-input"
                type="checkbox"
                {...formik.getFieldProps("confirm")}
              />
              <label
                className="form-check-label fw-bold ps-2 fs-6"
                htmlFor="deactivate"
              >
                I confirm to change my password
              </label>
            </div>
            {formik.touched.confirm && formik.errors.confirm && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.confirm}</div>
              </div>
            )}
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              id="kt_account_deactivate_account_submit"
              type="submit"
              className="btn btn-danger fw-bold"
            >
              {!loading && "Đổi mật khẩu"}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ChangePassword };
