export class QuoteItemModel {
  id!: number;
  asking_price_model: string = "";
  quotation_model: string = "";
  manufacturer: string = "";
  origin: string = "";
  unit: string = "";
  quantity: number = 0;
  inter: string = "";
  net_unit_price_no_vat?: number;
  unit_price_no_vat?: number;
  commission?: number;
  corporate_tax?: number;
  vat: number = 10;
  delivery_time?: Date;
  notes: string = "";
  origin_price?: number;

  total_selling_price_vat!: number;
  delivery_status?: string;
  delivery_date?: string;
}
