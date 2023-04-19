import { FC, createContext, useContext, useState } from "react";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteModelsModal } from "../components/modal/QuoteModelsModal";

class ContextProps {
    lateQuote?: any;
  openLateQuote: (item: QuoteModel) => void = () => true;
  close: () => void = () => true;
}

const ListViewAddonContext = createContext<ContextProps>(new ContextProps());

const ListLateQuoteProvider: FC = ({ children }) => {
  const [lateQuote, setLateQuote] = useState<QuoteModel | undefined>();

  const openLateQuote = (item: QuoteModel) => {
      setLateQuote(item);
  };

  const close = () => {
      setLateQuote(undefined);
  };

  return (
    <ListViewAddonContext.Provider
      value={{
        lateQuote,
        openLateQuote,
        close,
      }}
    >
      {children}
      {lateQuote && <QuoteModelsModal quote={lateQuote} onClose={close} />}
    </ListViewAddonContext.Provider>
  );
};

const useListLateQuoteContext = () => useContext(ListViewAddonContext);
export { ListLateQuoteProvider, useListLateQuoteContext };
