import { CompanyType } from "../../enums/CompanyType.enum";
import { FileUploadResponse } from "../core/FileUploadResponse.type";
import {UserModel} from "../../modules/auth/models/UserModel";

export class CompanyModel {
  id?: number;
  company_name: string = "";
  business_type: string = "";
  company_address: string = "";
  logo_id!: number;
  logoForEdit?: string | File;
  logo?: FileUploadResponse;
  "created_at": Date;
  "updated_at": Date;
  type: CompanyType = CompanyType.Company;
  sales?: UserModel;

  public get logoUrl(): string {
    return this.logo?.file_url || "";
  }

  public get typeText(): string {
    return this.type === CompanyType.Company ? "Công ty" : "Người dùng cuối";
  }
}
