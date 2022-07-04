import React from "react";
import { useFormik } from "formik";
import { FormMultipleFilesUploader } from "../../../../../../components/FormMultipleFilesUploader";

interface Props {
  formik: ReturnType<typeof useFormik>;
}

const QuoteAttachmentsStep: React.FC<Props> = ({ formik }) => {
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <div className="pt-2">
        <FormMultipleFilesUploader
          formik={formik as any}
          name="attachments"
          label="Chứng từ đi kèm (chọn nhiều)"
        />
      </div>
    </div>
  );
};

export { QuoteAttachmentsStep };
