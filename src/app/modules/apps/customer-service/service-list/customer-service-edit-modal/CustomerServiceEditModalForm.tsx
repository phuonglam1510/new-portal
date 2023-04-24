import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createCustomerService, updateCustomerService } from "../core/_requests";
import { useCustomerServiceContext } from "../core/CustomerServiceProvider";
import { FormInput } from "../../../../../components/FormInput";
import { FormImageUploader } from "../../../../../components/FormImageUploader";
import { Builder } from "builder-pattern";
import { CustomerServiceModel } from "../../../../../models/customers/CustomerService.class";
import { FormDropdown } from "../../../../../components/FormDropdown";
import { CompanyType } from "../../../../../enums/CompanyType.enum";
import { toast } from "../../../../../helpers/Toast.helper";
import { showError } from "../../../../../helpers/Error.helper";
import { businessTypeOptions } from "../../../../../constants/businessTypeOptions.constant";
import {useCustomerContext} from "../../../customers/companies-list/core/CustomerProvider";
import {FormDatePicker} from "../../../../../components/FormDatePicker";

type Props = {
  isUserLoading: boolean;
  customerService: CustomerServiceModel;
};


const editCustomerServiceSchema = Yup.object().shape({
  company_id: Yup.string().required(),
  contact_name: Yup.string().required("Thông tin người liên hệ là bắt buộc"),
  time: Yup.string().required("Ngày hẹn là bắt buộc"),
});

const CustomerServiceEditModalForm: FC<Props> = ({ customerService, isUserLoading }) => {
  const { setItemIdForUpdate, itemIdForUpdate } = useListView();
  const { refetchCustomerService } = useCustomerServiceContext();
  const { companies } = useCustomerContext();
  
  const [userForEdit] = useState<CustomerServiceModel>(
    Builder(CustomerServiceModel, {
      ...customerService,
    }).build()
  );

  const companyItems = React.useMemo(() => {
    return (
        companies?.map((item) => ({
          value: item.id || 0,
          text: item.company_name,
        })) || []
    );
  }, [companies]);

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCustomerService();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editCustomerServiceSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {;
        if (isNotEmpty(values.id)) {
          await updateCustomerService(values);
          toast("Tạo Lịch CSKH Thành Công");
        } else {
          const createdCompany = await createCustomerService(values);
          values.id = createdCompany.id;
          toast("Cập Nhật Lịch CSKH Thành Công");
        }

        cancel(true);
      } catch (ex: any) {
        console.error(ex);
        showError(ex.message);
      } finally {
        // setSubmitting(true);
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
          <h2>Liên Hệ</h2><br/>
          <FormDropdown
              formik={formik as any}
              name="company_id"
              items={companyItems}
              label="Khách Hàng"
          />
          <FormInput
            formik={formik as any}
            name="contact_name"
            label="Người Liên Hệ (Đối Tượng Làm Việc)"
          />
          <FormDatePicker formik={formik as any} name="time" label="Ngày Hẹn" key="time"/>
          <h2>Nội Dung Làm Việc</h2><br/>
          <FormInput
              formik={formik as any}
              name="main_device"
              label="Thiết bị sử dụng chủ yếu"
              optional={true}
          />
          <FormInput
              formik={formik as any}
              name="main_manufacturer"
              label="Hãng sử dụng chủ yếu"
              optional={true}
          />
          <FormInput
              formik={formik as any}
              name="purchase_process"
              label="Quy trình mua hàng"
              optional={true}
          />
          <FormInput
              formik={formik as any}
              name="purchase_plan"
              label="Kế hoạch mua hàng"
              optional={true}
          />
          <FormInput
              formik={formik as any}
              name="support_request"
              label="Yêu cầu hỗ trợ"
              optional={true}
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

export { CustomerServiceEditModalForm };
