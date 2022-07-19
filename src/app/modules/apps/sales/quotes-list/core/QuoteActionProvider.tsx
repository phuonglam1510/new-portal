import { FC, createContext, useContext, useState } from "react";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteTermModel } from "../../../../../models/sales/QuoteTermModel";
import { QuoteWarrantyModel } from "../../../../../models/sales/QuoteWarranty.model";
import { uploadImage } from "../../../core/images/requests";
import {
  QuoteFormModel,
  QuoteInfoFormModel,
} from "../new-quote/quoteCreationSchemas";
import {
  createQuote as createQuoteAPI,
  createQuoteInfo as createQuoteInfoAPI,
  createQuoteItem as createQuoteItemAPI,
  updateQuoteInfo,
  updateQuoteItem,
  updateQuote,
  addQuoteAttachment,
  removeAttachment,
  exportQuotePdf,
  addQuoteWarranty,
  updateQuoteWarranty,
  deleteQuoteWarranty,
  addQuoteTerm,
  updateQuoteTerm,
} from "./_requests";
import { fileKeyMap, loadAndOpenPdfFile, pickBody } from "./_util";

class ContextProps {
  loading: boolean = false;
  quote: QuoteModel | null = null;
  exportPdf!: (quoteId: number, modelIds: number[]) => Promise<boolean>;
  createQuote!: (quoteBody: QuoteFormModel) => Promise<QuoteModel | boolean>;
  editQuote!: (quoteBody: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteItems!: (quote: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteWarranty!: (
    quoteId: number,
    warranty: QuoteWarrantyModel
  ) => Promise<QuoteWarrantyModel | boolean>;
  editQuoteWarranty!: (
    quoteId: number,
    warranty: QuoteWarrantyModel
  ) => Promise<QuoteWarrantyModel | boolean>;
  removeQuoteWarranty!: (
    quoteId: number,
    warrantyId: number
  ) => Promise<boolean>;
  createQuoteItem!: (
    quoteId: number,
    quote: QuoteItemModel
  ) => Promise<QuoteItemModel | boolean>;
  editQuoteItem!: (
    quoteId: number,
    quote: QuoteItemModel
  ) => Promise<QuoteItemModel | boolean>;
  editQuoteInfo!: (
    quoteId: number,
    quote: QuoteInfoFormModel
  ) => Promise<QuoteInfoModel | boolean>;
  createQuoteInfo!: (quote: QuoteFormModel) => Promise<QuoteModel | boolean>;
  editQuoteTerm!: (
    quoteId: number,
    quote: QuoteTermModel
  ) => Promise<QuoteTermModel | boolean>;
  createQuoteTerm!: (
    quoteId: number,
    quote: QuoteTermModel
  ) => Promise<QuoteTermModel | boolean>;
  createQuoteAttachments!: (
    quote: QuoteFormModel
  ) => Promise<QuoteModel | boolean>;
  removeQuoteAttachment!: (
    quoteId: number,
    attachmentId: number
  ) => Promise<boolean>;
}

const QuoteActionContext = createContext<ContextProps>(new ContextProps());

const QuoteActionProvider: FC = ({ children }) => {
  const [quote, setQuote] = useState<QuoteModel | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuoteFiles = async (values: QuoteFormModel) => {
    const files: { [key: string]: File } = {};
    if (values.sale_signature && (values.sale_signature as File).name) {
      files.sale_signature = values.sale_signature as File;
    }
    if (values.order_confirmation && (values.order_confirmation as File).name) {
      files.order_confirmation = values.order_confirmation as File;
    }
    if (values.head_signature && (values.head_signature as File).name) {
      files.head_signature = values.head_signature as File;
    }
    if (!Object.keys(files).length) {
      return values;
    }
    await Promise.all(
      Object.keys(files).map((key) =>
        uploadImage(files[key]).then((fileRs) => {
          if (fileRs && fileRs.id) {
            values[fileKeyMap[key]] = fileRs.id;
          }
        })
      )
    );
    return values;
  };

  const createQuote = async (
    quoteForm: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);
      quoteForm = await handleQuoteFiles(quoteForm);
      const data = await createQuoteAPI(pickBody(quoteForm));
      setQuote(data);
      return data;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportPdf = async (
    quoteId: number,
    modelIds: number[]
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const query = modelIds.join(",");
      const baseUrl = `${process.env.REACT_APP_THEME_API_URL}/quote`;
      const url = `${baseUrl}/${quoteId}/export/pdf?item_id=${query}`;
      await loadAndOpenPdfFile(url, "application/pdf");
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editQuote = async (
    quoteForm: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);
      quoteForm = await handleQuoteFiles(quoteForm);
      const data = await updateQuote({
        ...pickBody(quoteForm),
        id: quoteForm.id || 0,
      });
      setQuote(data);
      return data;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteItems = async (
    quoteForm: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);

      await Promise.all(
        quoteForm.models.map((item) => createQuoteItemAPI(quote?.id || 0, item))
      );
      return quote || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteItem = async (
    quoteId: number,
    quoteItem: QuoteItemModel
  ): Promise<QuoteItemModel | boolean> => {
    try {
      setLoading(true);
      const data = await createQuoteItemAPI(quoteId, quoteItem);
      return data || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editQuoteItem = async (
    quoteId: number,
    quoteItem: QuoteItemModel
  ): Promise<QuoteItemModel | boolean> => {
    try {
      setLoading(true);
      const data = await updateQuoteItem(quoteId, quoteItem);
      return data || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteInfo = async (
    quoteForm: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);
      await createQuoteInfoAPI(quoteForm.id || quote?.id || 0, quoteForm.info);
      return quote || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editQuoteInfo = async (
    quoteId: number,
    quoteItem: QuoteInfoFormModel
  ): Promise<QuoteInfoModel | boolean> => {
    try {
      setLoading(true);

      const data = await updateQuoteInfo(quoteId, quoteItem);
      return data || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteTerm = async (
    quoteId: number,
    quoteTerm: QuoteTermModel
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await addQuoteTerm(quoteId || quote?.id || 0, quoteTerm);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editQuoteTerm = async (
    quoteId: number,
    quoteTerm: QuoteTermModel
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await updateQuoteTerm(quoteId || quote?.id || 0, quoteTerm);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeQuoteAttachment = async (
    quoteId: number,
    attachmentId: number
  ): Promise<boolean> => {
    try {
      setLoading(true);

      await removeAttachment(quoteId, attachmentId);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteAttachments = async (
    quoteForm: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);
      const hasNewAttachment = (quoteForm.attachments as File[]).find(
        (attachment: File) => attachment.name
      );
      if (!hasNewAttachment) {
        return true;
      }
      setLoading(true);
      const imageResults = await Promise.all(
        (quoteForm.attachments as File[])
          .filter((attachment: File) => attachment.name)
          .map((attachment) => uploadImage(attachment as File))
      );

      await Promise.all(
        imageResults
          .filter((rs) => rs.id)
          .map((rs) =>
            addQuoteAttachment(quoteForm.id || quote?.id || 0, rs.id)
          )
      );
      return quote || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createQuoteWarranty = async (
    quoteId: number,
    warranty: QuoteWarrantyModel
  ): Promise<QuoteWarrantyModel | boolean> => {
    try {
      setLoading(true);
      const data = await addQuoteWarranty(quoteId, warranty);
      return data || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editQuoteWarranty = async (
    quoteId: number,
    warranty: QuoteWarrantyModel
  ): Promise<QuoteWarrantyModel | boolean> => {
    try {
      setLoading(true);
      const { id, ...options } = warranty;
      const data = await updateQuoteWarranty(quoteId, warranty.id, options);
      return data || false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const removeQuoteWarranty = async (
    quoteId: number,
    warrantyId: number
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteQuoteWarranty(quoteId, warrantyId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuoteActionContext.Provider
      value={{
        loading,
        createQuote,
        createQuoteItems,
        createQuoteItem,
        createQuoteInfo,
        editQuoteItem,
        editQuoteInfo,
        editQuote,
        createQuoteAttachments,
        removeQuoteAttachment,
        createQuoteWarranty,
        editQuoteWarranty,
        removeQuoteWarranty,
        createQuoteTerm,
        editQuoteTerm,
        exportPdf,
        quote,
      }}
    >
      {children}
    </QuoteActionContext.Provider>
  );
};

const useQuoteActionContext = () => useContext(QuoteActionContext);
export { QuoteActionProvider, useQuoteActionContext };
