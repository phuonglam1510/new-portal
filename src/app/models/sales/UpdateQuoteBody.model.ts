import { CreateQuoteBody } from "./CreateQuoteBody.model";

export interface UpdateQuoteBody extends CreateQuoteBody {
  id: number;
}
