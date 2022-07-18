import { QuoteWarrantyStatus } from "../../enums/QuoteWarrantyStatus.enum";

export class QuoteWarrantyModel {
  quote_id!: number;
  quote_item_id!: number;
  issue!: string;
  time_start_warranty!: string;
  technical_in_charge!: string;
  errors!: string;
  warranty_process_time!: string;
  notes?: string;
  id!: number;
  cost_incurred!: number;
  status: QuoteWarrantyStatus = QuoteWarrantyStatus.Pending;
  created_at!: string;
  updated_at!: string;
}
