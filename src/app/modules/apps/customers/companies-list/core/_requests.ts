import axios, { AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { ID } from "../../../../../models/core/ID.type";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { CompanyQueryResponse } from "./_models";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const COMPANIES_URL = `${API_URL}/company`;

const getCompanies = (query: string): Promise<CompanyQueryResponse> => {
  return axios
    .get(`${COMPANIES_URL}?${query}`)
    .then((d: AxiosResponse<CompanyQueryResponse>) => d.data);
};

const getCompanyById = (id: ID): Promise<CompanyModel | undefined> => {
  return axios
    .get(`${COMPANIES_URL}/${id}`)
    .then(
      (response: AxiosResponse<GenericResponse<CompanyModel>>) => response.data
    )
    .then((response: GenericResponse<CompanyModel>) =>
      Builder(CompanyModel, response.data)
        .logoForEdit(response.data.logo?.file_url)
        .build()
    );
};

const createCompany = (
  company: CompanyModel
): Promise<CompanyModel | undefined> => {
  return axios
    .post(COMPANIES_URL, company)
    .then(
      (response: AxiosResponse<GenericResponse<CompanyModel>>) => response.data
    )
    .then((response: GenericResponse<CompanyModel>) => response.data);
};

const updateCompany = (
  company: CompanyModel
): Promise<CompanyModel | undefined> => {
  return axios
    .put(`${COMPANIES_URL}/${company.id}`, company)
    .then(
      (response: AxiosResponse<GenericResponse<CompanyModel>>) => response.data
    )
    .then((response: GenericResponse<CompanyModel>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${COMPANIES_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${COMPANIES_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getCompanies,
  deleteSelectedUsers,
  deleteUser,
  updateCompany,
  createCompany,
  getCompanyById,
};
