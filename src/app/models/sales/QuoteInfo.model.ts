import { OrderStatus } from "../../enums/OrderStatus.enum";

export class QuoteInfoModel {
  po_number!: number;
  bill_date!: Date;
  delivery_date!: Date;
  prepay!: number;
  invoice_number!: number;
  delivery_lading_number!: number;
  warranty_id!: number;
  deliver_record_id!: number;
  status: OrderStatus = OrderStatus.DeliveryNotYetDue;
  notes?: string;
  extra_cost?: number;
  remain?: number;

  total_selling_price_vat!: number;
  total_selling_price_no_vat!: number;
  total_net_unit_price_no_vat!: number;
  total_net_price_no_vat!: number;
}
