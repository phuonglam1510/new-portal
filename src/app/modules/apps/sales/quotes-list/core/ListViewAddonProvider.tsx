import { FC, createContext, useContext, useState } from "react";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteModelsModal } from "../components/modal/QuoteModelsModal";

class ContextProps {
  quote?: QuoteModel;
  open: (item: QuoteModel) => void = () => true;
  close: () => void = () => true;
}

const ListViewAddonContext = createContext<ContextProps>(new ContextProps());

const ListViewAddonProvider: FC = ({ children }) => {
  const [quote, setQuote] = useState<QuoteModel | undefined>();

  const open = (item: QuoteModel) => {
    setQuote(item);
  };

  const close = () => {
    setQuote(undefined);
  };

  return (
    <ListViewAddonContext.Provider
      value={{
        quote,
        open,
        close,
      }}
    >
      {children}
      {quote && <QuoteModelsModal quote={quote} onClose={close} />}
    </ListViewAddonContext.Provider>
  );
};

const useListViewAddonContext = () => useContext(ListViewAddonContext);
export { ListViewAddonProvider, useListViewAddonContext };
