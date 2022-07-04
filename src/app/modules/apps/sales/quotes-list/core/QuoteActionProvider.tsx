import { FC, createContext, useContext, useState } from "react";
import { FileUploadResponse } from "../../../../../models/core/FileUploadResponse.type";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
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
} from "./_requests";
import { fileKeyMap, pickBody } from "./_util";

interface ContextProps {
  loading: boolean;
  quote: QuoteModel | null;
  createQuote: (quoteBody: QuoteFormModel) => Promise<QuoteModel | boolean>;
  editQuote: (quoteBody: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteItems: (quote: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteItem: (
    quoteId: number,
    quote: QuoteItemModel
  ) => Promise<QuoteItemModel | boolean>;
  editQuoteItem: (
    quoteId: number,
    quote: QuoteItemModel
  ) => Promise<QuoteItemModel | boolean>;
  editQuoteInfo: (
    quoteId: number,
    quote: QuoteInfoFormModel
  ) => Promise<QuoteInfoModel | boolean>;
  createQuoteInfo: (quote: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteAttachments: (
    quote: QuoteFormModel
  ) => Promise<QuoteModel | boolean>;
}

const QuoteActionContext = createContext<ContextProps>({
  loading: false,
  createQuote: async () => true,
  editQuote: async () => true,
  createQuoteItems: async () => true,
  createQuoteInfo: async () => true,
  createQuoteItem: async () => true,
  editQuoteItem: async () => true,
  editQuoteInfo: async () => true,
  createQuoteAttachments: async () => true,
  quote: null,
});

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
        quote,
      }}
    >
      {children}
    </QuoteActionContext.Provider>
  );
};

const useQuoteActionContext = () => useContext(QuoteActionContext);
export { QuoteActionProvider, useQuoteActionContext };
