import { FC, createContext, useContext, useState } from "react";
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
} from "./_requests";
import { pickBody } from "./_util";

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
  quote: null,
});

const QuoteActionProvider: FC = ({ children }) => {
  const [quote, setQuote] = useState<QuoteModel | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuoteFiles = async (values: QuoteFormModel) => {
    const files: File[] = [];
    if (values.sale_signature) {
      files.push(values.sale_signature);
    }
    if (values.order_confirmation) {
      files.push(values.order_confirmation);
    }
    if (values.head_signature) {
      files.push(values.head_signature);
    }
    if (!files.length) {
      return values;
    }

    const rs = await Promise.all(files.map((file) => uploadImage(file)));
    if (rs) {
      if (rs[0]) {
        values.sale_signature_id = rs[0].id;
      }
      if (rs[1]) {
        values.order_confirmation_id = rs[1].id;
      }
      if (rs[2]) {
        values.head_signature_id = rs[2].id;
      }
      return values;
    }
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

      await createQuoteInfoAPI(quote?.id || 0, quoteForm.info);
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
        quote,
      }}
    >
      {children}
    </QuoteActionContext.Provider>
  );
};

const useQuoteActionContext = () => useContext(QuoteActionContext);
export { QuoteActionProvider, useQuoteActionContext };
