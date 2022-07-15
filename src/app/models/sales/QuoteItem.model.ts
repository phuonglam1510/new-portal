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
  vat?: number;
  delivery_time?: Date;
  notes: string = "";
}
