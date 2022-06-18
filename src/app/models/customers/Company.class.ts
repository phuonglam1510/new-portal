import { FileUploadResponse } from "../core/FileUploadResponse.type";

export class CompanyModel {
  id?: number;
  "company_name": string = "";
  "company_address": string = "";
  "logo_id": number;
  logoForEdit?: string | File;
  logo?: FileUploadResponse;
  "created_at": Date;
  "updated_at": Date;

  public get logoUrl(): string {
    return this.logo?.file_url || "";
  }
}
