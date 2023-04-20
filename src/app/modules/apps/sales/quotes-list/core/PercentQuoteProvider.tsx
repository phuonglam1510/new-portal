import { FC, createContext, useContext, useState } from "react";
import {QuoteModel} from "../../../../../models/sales/Quote.model";
import PercentPOModal from "../components/modal/PercentPOModal";
import {updateQuotePercentPO} from "./_requests";

class ContextProps {
    quote: QuoteModel = new QuoteModel();
    openPercentQuote: (quote: QuoteModel) => void = () => true;
    close: () => void = () => true;
    onUpdate: (value: number) => void = () => true;
}

const PercentQuotedContext = createContext<ContextProps>(new ContextProps());

const PercentQuoteProvider: FC = ({ children }) => {
    const [quote, setQuote] = useState<QuoteModel>(new QuoteModel());
    const [showPercent, setShowPercent] = useState<Boolean>(false);
    const openPercentQuote = (quote: QuoteModel) => {
        setQuote(quote);
        setShowPercent(true);
    };

    const onUpdate = (value: number) => {
        return updateQuotePercentPO({ id: quote.id || 0, percent: value})
            .then(res => {
                close();
                window.location.reload();
            });
    }

    const close = () => {
        setQuote(new QuoteModel());
        setShowPercent(false);
    };

    return (
        <PercentQuotedContext.Provider
            value={{
                quote,
                openPercentQuote,
                close,
                onUpdate,
            }}
        >
            {children}
            { showPercent && <PercentPOModal quote={quote} onClose={close} onUpdate={onUpdate}/> }
        </PercentQuotedContext.Provider>
    );
};

const usePercentQuoteContext = () => useContext(PercentQuotedContext);
export { PercentQuoteProvider, usePercentQuoteContext };
