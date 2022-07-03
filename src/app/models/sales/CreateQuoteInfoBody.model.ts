import { QuoteInfoModel } from "./QuoteInfo.model";

export type CreateQuoteInfoBody = Omit<QuoteInfoModel, "id">;
