import { GenericListResponse } from "../../../../../models/core/GenericListResponse.type";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { ContactModel } from "../../../../../models/customers/Contact.class";

export type CompanyQueryResponse = GenericListResponse<CompanyModel>;

export class CompanyFormModel extends CompanyModel {
  contacts: ContactModel[] = [];
  changedContactIds: number[] = [];
  removedContactIds: number[] = [];
}
