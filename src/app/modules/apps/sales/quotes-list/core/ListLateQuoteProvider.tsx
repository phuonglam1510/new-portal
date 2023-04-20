import { FC, createContext, useContext, useState } from "react";
import { LateQuoteModel } from "../../../../../models/sales/LateQuote.model";
import { useQuery } from "react-query";
import { getLatePrice } from "./_requests";
import LateQuoteModal from "../components/modal/LateQuoteModel";

class ContextProps {
  quotes: LateQuoteModel[]|[] = [];
  openLateQuote: () => void = () => true;
  close: () => void = () => true;
}

const ListLateQuoteContext = createContext<ContextProps>(new ContextProps());

const ListLateQuoteProvider: FC = ({ children }) => {
  const [quotes, SetQuote] = useState<LateQuoteModel[] | []>([]);

    const [show, setShow] = useState<Boolean>(false);
    const openLateQuote = () => {
        setShow(true);
    };

    const close = () => {
        setShow(false);
    };
    useQuery(`late-quote-price`,
        () => {
            return getLatePrice().then((res) => {
                SetQuote(res.data)

                return res.data;
            });
        });
  return (
    <ListLateQuoteContext.Provider
      value={{
        quotes,
        openLateQuote,
        close,
      }}
    >
      {children}
      {quotes.length > 0 && show && <LateQuoteModal quotes={quotes} onClose={close} />}
    </ListLateQuoteContext.Provider>
  );
};

const useListLateQuoteContext = () => useContext(ListLateQuoteContext);
export { ListLateQuoteProvider, useListLateQuoteContext };
