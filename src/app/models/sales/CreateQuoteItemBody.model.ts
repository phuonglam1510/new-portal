import { QuoteItemModel } from "./QuoteItem.model";

export type CreateQuoteItemBody = Omit<QuoteItemModel, "id">;
