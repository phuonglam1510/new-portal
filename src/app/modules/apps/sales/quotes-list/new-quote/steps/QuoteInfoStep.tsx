import React from "react";
import { useFormik } from "formik";
import { FormDropdown } from "../../../../../../components/FormDropdown";
import { useContactContext } from "../../../../customers/contacts-list/core/ContactProvider";
import { useCustomerContext } from "../../../../customers/companies-list/core/CustomerProvider";
import { FormFileUploader } from "../../../../../../components/FormFileUploader";
import { quoteTypes } from "../../../../../../constants/quoteTypes.constant";
import { quoteStatuses } from "../../../../../../constants/quoteStatuses.constant";
import { shippingPoints } from "../../../../../../constants/shippingPoints.constant";
import { packageQualityOptions } from "../../../../../../constants/packageQualityOptions.constant";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

const QuoteInfoStep: React.FC<Props> = ({ formik }) => {
  const { contacts } = useContactContext();
  const { companies } = useCustomerContext();
  const companyId = formik.values.company_id;
  formik.values.package_quality = "Mới 100%";
  formik.values.delivery_address = "Kho khách hàng";
  const contactItems = React.useMemo(
    () =>
      companyId
        ? contacts
            ?.filter((item) => item.company_id === Number(companyId))
            .map((item) => ({
              value: item.id || 0,
              text: item.contact_name,
            })) || []
        : contacts?.map((item) => ({
            value: item.id || 0,
            text: item.contact_name,
          })) || [],
    [contacts, companyId]
  );

  const companyItems = React.useMemo(() => {
    return (
      companies?.map((item) => ({
        value: item.id || 0,
        text: item.company_name,
      })) || []
    );
  }, [companies]);

  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <div className="pt-2">
        <FormDropdown
          formik={formik as any}
          name="company_id"
          items={companyItems}
          label="Công ty"
        />
        <FormDropdown
          formik={formik as any}
          name="contact_id"
          items={contactItems}
          label="Người liên hệ"
        />
        <FormDropdown
          formik={formik as any}
          name="type"
          items={quoteTypes}
          label="Loại đơn hàng"
          optional
        />
        <FormDropdown
          items={shippingPoints.map((point) => ({
            value: point,
            text: point,
          }))}
          formik={formik as any}
          name="delivery_address"
          label="Địa điểm giao hàng"
          optional
        />
        <FormDropdown
          items={packageQualityOptions.map((item) => ({
            value: item,
            text: item,
          }))}
          formik={formik as any}
          name="package_quality"
          label="Chất lượng hàng hoá"
          optional
        />
        <FormDropdown
          formik={formik as any}
          name="status"
          items={quoteStatuses}
          label="Trạng thái"
        />
        <FormFileUploader
          formik={formik as any}
          name="sale_signature"
          label="Chữ ký sale"
        />
        <FormFileUploader
          formik={formik as any}
          name="head_signature"
          label="Chữ ký thủ trưởng đơn vị"
        />
        <FormFileUploader
          formik={formik as any}
          name="order_confirmation"
          label="Xác nhận đặt hàng"
        />
      </div>
    </div>
  );
};

export { QuoteInfoStep };
