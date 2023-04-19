import { FC, createContext, useContext, useState } from "react";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteModelsModal } from "../components/modal/QuoteModelsModal";
import {LateDeliveryModel} from "../../../../../models/sales/LateDelivery.model";
import {getQuoteDetail} from "../../quote-detail/core/_requests";
import {getLateDelivery, getQuotes} from "./_requests";
import LateDeliveryModal from "../components/modal/LateDeliveryModal";
import { useQuery } from "react-query";

class ContextProps {
    delivery: LateDeliveryModel[]|[] = [];
    openDelivery: () => void = () => true;
    close: () => void = () => true;
}

const ListLateDeliveryContext = createContext<ContextProps>(new ContextProps());

const ListLateDeliveryProvider: FC = ({ children }) => {
    const [delivery, setDelivery] = useState<LateDeliveryModel[] | []>([]);
    const [show, setShow] = useState<Boolean>(false);
    const openDelivery = () => {
        setShow(true);
    };

    const close = () => {
        setShow(false);
    };
    useQuery(`late-delivery`,
        () => {
            return getLateDelivery().then((res) => {
                setDelivery(res.data)

                return res.data;
            });
        });
    return (
        <ListLateDeliveryContext.Provider
            value={{
                delivery,
                openDelivery,
                close,
            }}
        >
            {children}
            {delivery.length > 0 && show && <LateDeliveryModal delivery={delivery} onClose={close} />}
        </ListLateDeliveryContext.Provider>
    );
};

const useListLateDeliveryContext = () => useContext(ListLateDeliveryContext);
export { ListLateDeliveryProvider, useListLateDeliveryContext };
