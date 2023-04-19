import {QuoteItemModel} from "./QuoteItem.model";

export class ExportHistoryModel {
    id!: number;
    quote_id: number = 0;
    item_id: number = 0;
    type: string = "";
    po_number: string = "";
    item: QuoteItemModel = new QuoteItemModel();
    created_at!: string;
    updated_at!: string;
}