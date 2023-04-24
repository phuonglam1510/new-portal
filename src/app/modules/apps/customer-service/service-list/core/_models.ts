import { GenericListResponse } from "../../../../../models/core/GenericListResponse.type";
import { CustomerServiceModel } from "../../../../../models/customers/CustomerService.class";
import { User } from "../../../../../models/users/User.interface";

export type CustomerServiceQueryResponse = GenericListResponse<CustomerServiceModel>;