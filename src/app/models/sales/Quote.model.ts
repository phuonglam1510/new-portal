import moment from "moment";
import { QuoteStatus } from "../../enums/QuoteStatus.enum";
import { QuoteType } from "../../enums/QuoteType.enum";
import { UserModel } from "../../modules/auth/models/UserModel";
import { ContactModel } from "../customers/Contact.class";
import { QuoteItemModel } from "./QuoteItem.model";
import { QuoteExportedInfoModel } from "./QuoteExportedInfo.model";
import { ExportHistoryModel } from "./ExportHistoryModel.model";

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
  quote_exported_model?: string;
  quote_exported_info?: QuoteExportedInfoModel;
  created_at: string = "";

  sale_id: number = 0;
  sale?: UserModel;

  quote_items: QuoteItemModel[] = [];

  contact: ContactModel = new ContactModel();
  of_current_user: boolean = false;
  possible_percent: number = 0;

  export_history: ExportHistoryModel[] = [];
  callback: ((data: any) => void) | undefined;

  public get saleName(): string {
    return this.sale?.name || "";
  }

  public get exportedItemIds(): number[] {
    try {
      const array = JSON.parse(this.quote_exported_model || "");

      return array.map((id: string) => Number(id));
    } catch (error) {
      return [];
    }
  }

  public get statusName(): string {
    let status: string = "Chờ báo giá";
    switch (this.status) {
      case QuoteStatus.Wating:
        status = "Chờ báo giá";
        break;
      case QuoteStatus.Sold:
        status = "Bán hàng";
        break;
      case QuoteStatus.Quoted:
        status = "Đã báo giá";
        break;
      case QuoteStatus.UNPRICEABLE:
        status = "Không thể báo giá";
        break;
    }

    return status;
  }

  public get typeName(): string {
    return this.type === QuoteType.Sale ? "Bán Hàng" : "Dịch vụ";
  }

  public get createdAtText(): string {
    return this.created_at
      ? moment(this.created_at).format("DD/MM/YYYY")
      : "Unknown";
  }
}
