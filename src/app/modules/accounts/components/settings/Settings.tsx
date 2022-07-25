import React, { useState } from "react";
import { useFormik } from "formik";
import { Builder } from "builder-pattern";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../auth/models/UserModel";
import { useCurrentUser } from "../../../apps/core/CurrentUserProvider";
import { FormInput } from "../../../../components/FormInput";
import { FormDropdown } from "../../../../components/FormDropdown";
import { FormImageUploader } from "../../../../components/FormImageUploader";
import { UserGroup } from "../../../../enums/UserGroup.enum";
import { uploadImage } from "../../../apps/core/images/requests";
import { updateUser } from "../../../apps/user-management/users-list/core/_requests";
import { User } from "../../../../models/users/User.interface";
import { ChangePassword } from "./cards/ChangePassword";

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  group: Yup.number().required("Please select user group"),
});

const useGroups = [
  { text: "Nhóm 1", value: UserGroup.Group1 },
  { text: "Nhóm 2", value: UserGroup.Group2 },
  { text: "Nhóm 3", value: UserGroup.Group3 },
];

class UserFormModel extends UserModel {
  avatarForEdit?: string | File;
}

const Settings: React.FC = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleImage = async (values: UserFormModel) => {
    if (!values.avatarForEdit || typeof values.avatarForEdit === "string") {
      return values;
    }
    const rs = await uploadImage(values.avatarForEdit);
    if (rs) {
      values.avatar_id = rs.id;
      return values;
    }
    return values;
  };

  const handleUpdate = async (values: UserFormModel) => {
    values = await handleImage(values);

    await updateUser(Builder(User, { ...values }).build());
  };

  const formik = useFormik<UserFormModel>({
    initialValues: Builder(UserFormModel, {
      ...user,
      avatarForEdit: user?.avatar?.file_url,
    }).build(),
    validationSchema: editUserSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      formik.setSubmitting(true);
      handleUpdate(values)
        .then(() => {
          navigate(`/account/overview`);
        })
        .catch((e) => alert(e.message))
        .finally(() => {
          setLoading(false);
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div
          className="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Tài khoản</h3>
          </div>
        </div>

        <div id="kt_account_profile_details" className="collapse show">
          <form onSubmit={formik.handleSubmit} noValidate className="form">
            <div className="card-body border-top p-9">
              <div className="d-flex flex-column" style={{ flex: 1 }}>
                <div className="pt-2">
                  <FormImageUploader
                    name="avatarForEdit"
                    formik={formik as any}
                    label="Avatar"
                  />
                  <FormInput
                    name="name"
                    label="Tên đầy đủ"
                    formik={formik as any}
                  />
                  <FormInput
                    name="email"
                    label="Email"
                    formik={formik as any}
                    disabled
                  />
                  <FormDropdown
                    formik={formik as any}
                    items={useGroups}
                    name="group"
                    label="Nhóm"
                  />
                  <FormInput
                    name="phone"
                    label="Số điện thoại"
                    formik={formik as any}
                    optional
                  />
                  <FormInput
                    name="position"
                    label="Chức vụ"
                    formik={formik as any}
                    optional
                  />
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button className="btn btn-light mx-6" disabled={loading}>
                {!loading && "Huỷ bỏ"}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {!loading && "Lưu"}
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
      <ChangePassword />
    </>
  );
};

export { Settings };
