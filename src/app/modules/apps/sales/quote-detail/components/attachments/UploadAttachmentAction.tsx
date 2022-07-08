import { Builder } from "builder-pattern";
import React from "react";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { UploadFileModal } from "../../../../core/upload-files-modal/UploadFileModal";
import { useQuoteActionContext } from "../../../quotes-list/core/QuoteActionProvider";
import { QuoteFormModel } from "../../../quotes-list/new-quote/quoteCreationSchemas";
import { useQuoteDetailContext } from "../../core/QuoteDetailProvider";

export function UploadAttachmentAction() {
  const [visible, setVisible] = React.useState(false);
  const { quote, loadQuoteDetail } = useQuoteDetailContext();
  const { createQuoteAttachments, loading } = useQuoteActionContext();

  const onSave = async (files: File[]) => {
    await createQuoteAttachments(
      Builder(QuoteFormModel, { id: quote.id, attachments: files }).build()
    );
    setVisible(false);
    loadQuoteDetail(quote.id?.toString() || "");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary align-self-center"
        onClick={() => setVisible(true)}
      >
        <KTSVG
          path="/media/icons/duotune/files/fil018.svg"
          className="svg-icon-2"
        />
        Upload Files
      </button>
      {visible && (
        <UploadFileModal
          onClose={() => setVisible(false)}
          onSave={onSave}
          loading={loading}
        />
      )}
    </>
  );
}
