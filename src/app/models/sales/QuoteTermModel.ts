import moment from "moment";
import { VaxInclude } from "../../enums/VaxInclude.enum";

export class QuoteTermModel {
  quote_id!: number;
  id!: number;

  quote_effect!: string;
  warranty_condition!: string;
  payment_term!: string;
  bank_info!: string;
  trade_condition!: string;
  vat_include: VaxInclude = VaxInclude.Include;

  created_at!: string;
  updated_at!: string;

  public get quoteEffectText(): string {
    return moment(this.quote_effect).format("DD-MM-YYYY");
  }
}
