import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createContact, updateContact } from "../core/_requests";
import { useContactContext } from "../core/ContactProvider";
import { FormInput } from "../../../../../components/FormInput";
import { Builder } from "builder-pattern";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { FormDropdown } from "../../../../../components/FormDropdown";
import { useCustomerContext } from "../../companies-list/core/CustomerProvider";

type Props = {
  isUserLoading: boolean;
  contact: ContactModel;
};

const editUserSchema = Yup.object().shape({
  contact_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Name is required"),
  contact_email: Yup.string().required("Email is required"),
  contact_phone: Yup.string().required("Phone is required"),
  contact_position: Yup.string().required("Position is required"),
  company_id: Yup.string().required("Company is required"),
});

const ContactEditModalForm: FC<Props> = ({ contact, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useContactContext();
  const { companies, refetchCompanies } = useCustomerContext();

  const companyItems = React.useMemo(
    () =>
      companies?.map((item) => ({
        value: item.id || 0,
        text: item.company_name,
      })) || [],
    [companies]
  );

  const [userForEdit] = useState<ContactModel>(
    Builder(ContactModel, {
      ...contact,
    }).build()
  );

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateContact(values);
        } else {
          await createContact(values);
        }
        cancel(true);
      } catch (ex: any) {
        console.error(ex);
        alert(ex.message);
        cancel();
      } finally {
        setSubmitting(true);
      }
    },
  });

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <FormDropdown
            formik={formik as any}
            items={companyItems}
            name="company_id"
            label="Công ty"
          />
          <FormInput
            formik={formik as any}
            name="contact_name"
            label="Họ Tên"
          />
          <FormInput
            formik={formik as any}
            name="contact_email"
            label="Email"
          />
          <FormInput
            formik={formik as any}
            name="contact_phone"
            label="Số điện thoại"
          />
          <FormInput
            formik={formik as any}
            name="contact_position"
            label="Chức vụ"
          />
        </div>

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
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { ContactEditModalForm };
