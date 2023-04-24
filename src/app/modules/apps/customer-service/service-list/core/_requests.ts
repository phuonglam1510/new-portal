import axios, { AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import { handleAxiosError } from "../../../../../helpers/Error.helper";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { ID } from "../../../../../models/core/ID.type";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { CustomerServiceQueryResponse } from "./_models";
import {CustomerServiceModel} from "../../../../../models/customers/CustomerService.class";
import {ContactModel} from "../../../../../models/customers/Contact.class";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const CUSTOMER_URL = `${API_URL}/customer_service`;

const getCustomerServices = (query: string): Promise<CustomerServiceQueryResponse> => {
    return axios
        .get(`${CUSTOMER_URL}?${query}`)
        .then((d: AxiosResponse<CustomerServiceQueryResponse>) => d.data);
};

const getCustomerServiceById = (id: ID): Promise<CustomerServiceModel | undefined> => {
    return axios
        .get(`${CUSTOMER_URL}/${id}`)
        .then(
            (response: AxiosResponse<GenericResponse<CustomerServiceModel>>) => response.data
        )
        .then((response: GenericResponse<CustomerServiceModel>) =>
            Builder(CustomerServiceModel, response.data).build()
        );
};

const createCustomerService = (customerService: CustomerServiceModel): Promise<CustomerServiceModel> => {
    return axios
        .post(CUSTOMER_URL, customerService)
        .then(
            (response: AxiosResponse<GenericResponse<CustomerServiceModel>>) => response.data
        )
        .then((response: GenericResponse<CustomerServiceModel>) => response.data)
        .catch(handleAxiosError);
};

const updateCustomerService = (
    customerService: CustomerServiceModel
): Promise<CustomerServiceModel | undefined> => {
    return axios
        .put(`${CUSTOMER_URL}/${customerService.id}`, customerService)
        .then(
            (response: AxiosResponse<GenericResponse<CustomerServiceModel>>) => response.data
        )
        .then((response: GenericResponse<CustomerServiceModel>) => response.data)
        .catch(handleAxiosError);
};

const deleteCustomerService = (id: ID[]): Promise<boolean> => {
    return axios
        .delete(`${CUSTOMER_URL}/${id[0]}?id=${id.join(",")}`)
        .then((d: AxiosResponse<boolean>) => d.data);
}
export {
    getCustomerServices,
    deleteCustomerService,
    getCustomerServiceById,
    createCustomerService,
    updateCustomerService
}