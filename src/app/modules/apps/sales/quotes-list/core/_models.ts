import { GenericListResponse } from "../../../../../models/core/GenericListResponse.type";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { QuoteModel } from "../../../../../models/sales/Quote.model";

export type QuoteQueryResponse = GenericListResponse<QuoteModel>;

export class CompanyFormModel extends CompanyModel {
  contacts: ContactModel[] = [];
  changedContactIds: number[] = [];
  removedContactIds: number[] = [];
}
