import { QuoteStatus } from "../../enums/QuoteStatus.enum";
import { QuoteType } from "../../enums/QuoteType.enum";
import { UserModel } from "../../modules/auth/models/UserModel";
import { ContactModel } from "../customers/Contact.class";

export class QuoteModel {
  id?: number;
  contact_id?: number;
  type: QuoteType = QuoteType.Sale;
  delivery_address?: string;
  package_quality?: string;
  sale_signature_id?: number;
  order_confirmation_id?: number;
  head_signature_id?: number;
  deliver_record_id?: number;
  status: QuoteStatus = QuoteStatus.Wating;

  created_at: string = "";

  sale_id: number = 0;
  sale?: UserModel;

  contact: ContactModel = new ContactModel();

  public get saleName(): string {
    return this.sale?.name || "";
  }

  public get statusName(): string {
    return this.status === QuoteStatus.Wating ? "Chờ báo giá" : "Đã báo giá";
  }

  public get typeName(): string {
    return this.type === QuoteType.Sale ? "Bán Hàng" : "Dịch vụ";
  }

  public get createdAtText(): string {
    return this.created_at
      ? new Date(this.created_at).toDateString()
      : "Unknown";
  }
}