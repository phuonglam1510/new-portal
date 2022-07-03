import { FC, createContext, useContext, useState } from "react";
import { QuoteDetailModel } from "./_models";
import { getQuoteDetail } from "./_requests";

interface ContextProps {
  loading: boolean;
  quote: QuoteDetailModel;
  loadQuoteDetail: (id: string) => Promise<QuoteDetailModel | boolean>;
}

const QuoteDetailContext = createContext<ContextProps>({
  loading: false,
  loadQuoteDetail: async () => true,
  quote: new QuoteDetailModel(),
});

const QuoteDetailProvider: FC = ({ children }) => {
  const [quote, setQuote] = useState<QuoteDetailModel>(new QuoteDetailModel());
  const [loading, setLoading] = useState(false);

  const loadQuoteDetail = async (
    id: string
  ): Promise<QuoteDetailModel | boolean> => {
    try {
      setLoading(true);
      const data = await getQuoteDetail(id);
      setQuote(data);
      return data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuoteDetailContext.Provider
      value={{
        loading,
        loadQuoteDetail,
        quote,
      }}
    >
      {children}
    </QuoteDetailContext.Provider>
  );
};

const useQuoteDetailContext = () => useContext(QuoteDetailContext);
export { QuoteDetailProvider, useQuoteDetailContext };
