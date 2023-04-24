import {CompanyModel} from "./Company.class";
import {UserModel} from "../../modules/auth/models/UserModel";
import moment from "moment/moment";
import {CustomerServiceStatus} from "../../enums/CustomerServiceType.enum";

export class CustomerServiceModel {
    id?: number;
    company: CompanyModel = new CompanyModel();
    company_id?: number;
    sales: UserModel = new UserModel();
    contact_name: string = "";
    sale_id?: number;
    time: Date = new Date();
    main_device?: string
    main_manufacturer?: string
    purchase_process?: string
    purchase_plan?: string
    support_request?: string
    notes?: string

    status: string = "pending";

    created_at?: string;
    public get saleName(): string {
        return this.sales?.name || "";
    }

    public get companyName(): string {
        return this.company?.company_name || "";
    }

    public get createdAtText(): string {
        return this.created_at
            ? moment(this.created_at).format("DD/MM/YYYY")
            : "";
    }

    public get statusName(): string {
        let name: string = "Đang Chờ";
        switch (this.status) {
            case CustomerServiceStatus.DONE:
                name = "Đã Hoàn Thành";
                break;
            case CustomerServiceStatus.OVER:
                name = "Quá Hạn";
                break;
            default:
                break;
        }

        return name;
    }
}
