import { CompanyModel } from "./Company.class";

export class ContactModel {
  id?: number;
  contact_name: string = "";
  contact_email: string = "";
  contact_position: string = "";
  contact_phone: string = "";
  note?: string;
  company_id: number = -1;
  created_at: Date = new Date();
  updated_at: Date = new Date();

  company: CompanyModel = new CompanyModel();

  public get companyName(): string {
    return this.company.company_name;
  }
}
