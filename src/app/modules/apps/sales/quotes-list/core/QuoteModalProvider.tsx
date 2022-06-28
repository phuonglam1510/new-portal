import { FC, createContext, useContext, useState } from "react";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteEditModal } from "../quote-edit-modal/QuoteEditModal";

class ContextProps {
  itemForUpdate?: QuoteItemModel;
  open: (item: QuoteItemModel, callback?: Function) => void = () => true;
  close: () => void = () => true;
}

const QuoteModalContext = createContext<ContextProps>(new ContextProps());

let onSave: any = null;

const QuoteModalProvider: FC = ({ children }) => {
  const [itemForUpdate, setItemIdForUpdate] = useState<QuoteItemModel | undefined>();

  const open = (item: QuoteItemModel, callback?: Function) => {
    setItemIdForUpdate(item);
    onSave = callback
  }

  const close = () => {
    setItemIdForUpdate(undefined);
  }


  return (
    <QuoteModalContext.Provider
      value={{
        itemForUpdate, open, close
      }}
    >
      {children}
      {itemForUpdate && <QuoteEditModal onSave={onSave} />}
    </QuoteModalContext.Provider>
  );
};

const useQuoteModalContext = () => useContext(QuoteModalContext);
export { QuoteModalProvider, useQuoteModalContext };
