import { FC, createContext, useContext, useState } from "react";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { uploadImage } from "../../../core/images/requests";
import { QuoteFormModel } from "../new-quote/quoteCreationSchemas";
import {
  createQuote as createQuoteAPI,
  createQuoteItem as createQuoteItemAPI,
} from "./_requests";
import { pickBody } from "./_util";

interface ContextProps {
  loading: boolean;
  quote: QuoteModel | null;
  createQuote: (quoteBody: QuoteFormModel) => Promise<QuoteModel | boolean>;
  createQuoteItems: (quote: QuoteFormModel) => Promise<QuoteModel | boolean>;
}

const QuoteActionContext = createContext<ContextProps>({
  loading: false,
  createQuote: async () => true,
  createQuoteItems: async () => true,
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
    quote: QuoteFormModel
  ): Promise<QuoteModel | boolean> => {
    try {
      setLoading(true);
      quote = await handleQuoteFiles(quote);
      const data = await createQuoteAPI(pickBody(quote));
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

  return (
    <QuoteActionContext.Provider
      value={{
        loading,
        createQuote,
        createQuoteItems,
        quote,
      }}
    >
      {children}
    </QuoteActionContext.Provider>
  );
};

const useQuoteActionContext = () => useContext(QuoteActionContext);
export { QuoteActionProvider, useQuoteActionContext };
