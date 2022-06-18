import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { initialUser } from "../core/_models";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createUser, updateUser } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { User } from "../../../../../models/users/User.interface";
import { Builder } from "builder-pattern";
import { FormInput } from "../../../../../components/FormInput";
import { FormSelectList } from "../../../../../components/FormSelectList";
import { userRoles } from "../../../../../constants/userRoles.constant";
import { FormImageUploader } from "../../../../../components/FormImageUploader";
import { uploadImage } from "../../../core/images/requests";

type Props = {
  isUserLoading: boolean;
  user: User;
};

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
  password: Yup.string()
    .min(3, "Minimum 8 symbols")
    .required("Password is required"),
});

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [userForEdit] = useState<User>(
    Builder(User, {
      ...user,
      avatar: user.avatar || initialUser.avatar,
      role: user.role || initialUser.role,
      name: user.name || initialUser.name,
      email: user.email || initialUser.email,
      password: initialUser.password,
    }).build()
  );

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const handleImage = async (values: User) => {
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

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        values = await handleImage(values);
        if (isNotEmpty(values.id)) {
          await updateUser(values);
        } else {
          await createUser(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    },
  });

  console.log(formik.values);

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n5 pe-5"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <FormImageUploader
            name="avatarForEdit"
            formik={formik as any}
            label="Avatar"
          />
          <FormInput
            name="name"
            label="Tên đầy đủ"
            formik={formik as any}
            disabled={isUserLoading}
          />
          <FormInput
            name="password"
            label="Mật khẩu"
            formik={formik as any}
            disabled={isUserLoading}
          />
          <FormInput
            name="email"
            label="Email"
            formik={formik as any}
            disabled={isUserLoading}
          />
          <FormInput
            name="phone"
            label="Số điện thoại"
            formik={formik as any}
            disabled={isUserLoading}
            optional
          />
          <FormInput
            name="position"
            label="Chức vụ"
            formik={formik as any}
            disabled={isUserLoading}
            optional
          />
          <FormSelectList
            name="role"
            formik={formik as any}
            items={userRoles}
            label="Phân Quyền"
            disabled={formik.isSubmitting || isUserLoading}
          />
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { UserEditModalForm };
