import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createCompany, updateCompany } from "../core/_requests";
import { useCustomerContext } from "../core/CustomerProvider";
import { FormInput } from "../../../../../components/FormInput";
import { FormImageUploader } from "../../../../../components/FormImageUploader";
import { uploadImage } from "../../../core/images/requests";
import { Builder } from "builder-pattern";
import { ContactEditableList } from "../components/form/\bContactEditableList";
import { CompanyFormModel } from "../core/_models";
import { useContactContext } from "../../contacts-list/core/ContactProvider";
import {
  createContact,
  deleteContact,
  updateContact,
} from "../../contacts-list/core/_requests";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { FormDropdown } from "../../../../../components/FormDropdown";
import { CompanyType } from "../../../../../enums/CompanyType.enum";
import { toast } from "../../../../../helpers/Toast.helper";
import { showError } from "../../../../../helpers/Error.helper";

type Props = {
  isUserLoading: boolean;
  company: CompanyFormModel;
};

const companyType = [
  { text: "Người Dùng Cuối", value: CompanyType.EndUser },
  { text: "Công ty", value: CompanyType.Company },
];

const editUserSchema = Yup.object().shape({
  company_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Company name is required"),
  business_type: Yup.string().required("Business Type is required"),
  company_address: Yup.string().required("Company address is required"),
  type: Yup.string().required("Type is required"),
});

const CompanyEditModalForm: FC<Props> = ({ company, isUserLoading }) => {
  const { setItemIdForUpdate, itemIdForUpdate } = useListView();
  const { refetchCompanies } = useCustomerContext();
  const { contacts, refetch } = useContactContext();

  const [userForEdit] = useState<CompanyFormModel>(
    Builder(CompanyFormModel, {
      ...company,
    }).build()
  );

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCompanies();
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const handleImage = async (values: CompanyFormModel) => {
    if (!values.logoForEdit || typeof values.logoForEdit === "string") {
      return values;
    }
    const rs = await uploadImage(values.logoForEdit);
    if (rs) {
      values.logo_id = rs.id;
      return values;
    }
    return values;
  };

  const handleContacts = async (values: CompanyFormModel) => {
    const { contacts } = values;
    const newContacts = contacts
      .filter((contact) => !contact.id)
      .map((contact) =>
        Builder(ContactModel, contact)
          .company_id(values.id as number)
          .build()
      );
    if (
      newContacts.length ||
      values.removedContactIds.length ||
      values.changedContactIds.length
    ) {
      const newContacts = contacts
        .filter((contact) => !contact.id)
        .map((contact) =>
          Builder(ContactModel, contact)
            .company_id(values.id as number)
            .build()
        );
      await Promise.all([
        ...newContacts.map((contact) => createContact(contact)),
        ...values.removedContactIds.map((id) => deleteContact(id)),
        ...contacts
          .filter(
            (contact) =>
              contact.id &&
              values.changedContactIds.includes(contact.id as number)
          )
          .map((contact) => updateContact(contact)),
      ]);
    }
  };

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        values = await handleImage(values);
        if (isNotEmpty(values.id)) {
          await updateCompany(values);
        } else {
          const createdCompany = await createCompany(values);
          values.id = createdCompany.id;
        }
        await handleContacts(values);
        toast("Cập nhật khách hàng thành công!");
      } catch (ex: any) {
        console.error(ex);
        showError(ex.message);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    },
  });

  React.useEffect(() => {
    if (itemIdForUpdate && contacts && contacts.length > 0) {
      formik.setFieldValue(
        "contacts",
        contacts.filter((contact) => contact.company_id === itemIdForUpdate),
        true
      );
    }
  }, [itemIdForUpdate, contacts]);

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
          className="d-flex flex-column scroll-y me-n3 pe-5"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <FormImageUploader
            name="logoForEdit"
            formik={formik as any}
            label="Logo"
          />
          <FormInput
            formik={formik as any}
            name="company_name"
            label="Tên công ty"
          />
          <FormInput
            formik={formik as any}
            name="company_address"
            label="Địa chỉ công ty"
          />
          <FormInput
            formik={formik as any}
            name="business_type"
            label="Ngành nghề"
          />
          <FormDropdown
            formik={formik as any}
            items={companyType}
            name="type"
            label="Loại khách hàng"
          />
          <ContactEditableList
            formik={formik as any}
            name="contacts"
            label="Người liên hệ"
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
            Huỷ
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
            <span className="indicator-label">
              {itemIdForUpdate ? "Cập nhật" : "Tạo"}
            </span>
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

export { CompanyEditModalForm };
