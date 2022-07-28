import axios, { AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import { handleAxiosError } from "../../../../../helpers/Error.helper";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { ID } from "../../../../../models/core/ID.type";
import { CompanyModel } from "../../../../../models/customers/Company.class";
import { CreateQuoteBody } from "../../../../../models/sales/CreateQuoteBody.model";
import { CreateQuoteInfoBody } from "../../../../../models/sales/CreateQuoteInfoBody.model";
import { CreateQuoteItemBody } from "../../../../../models/sales/CreateQuoteItemBody.model";
import { QuoteModel } from "../../../../../models/sales/Quote.model";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteTermModel } from "../../../../../models/sales/QuoteTermModel";
import { QuoteWarrantyModel } from "../../../../../models/sales/QuoteWarranty.model";
import { UpdateQuoteBody } from "../../../../../models/sales/UpdateQuoteBody.model";
import { QuoteQueryResponse } from "./_models";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const URL = `${API_URL}/quote`;

const getQuotes = (query: string): Promise<QuoteQueryResponse> => {
  return axios
    .get(`${URL}?${query}`)
    .then((d: AxiosResponse<QuoteQueryResponse>) => d.data);
};

const getCompanyById = (id: ID): Promise<CompanyModel | undefined> => {
  return axios
    .get(`${URL}/${id}`)
    .then(
      (response: AxiosResponse<GenericResponse<CompanyModel>>) => response.data
    )
    .then((response: GenericResponse<CompanyModel>) =>
      Builder(CompanyModel, response.data)
        .logoForEdit(response.data.logo?.file_url)
        .build()
    );
};

const createQuote = (body: CreateQuoteBody): Promise<QuoteModel> => {
  return axios
    .post(URL, body)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteModel>>) => response.data
    )
    .then((response: GenericResponse<QuoteModel>) => response.data);
};

const updateQuote = (body: UpdateQuoteBody): Promise<QuoteModel> => {
  const { id, ...rest } = body;
  return axios
    .put(`${URL}/${id}`, rest)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteModel>>) => response.data
    )
    .then((response: GenericResponse<QuoteModel>) => response.data);
};

const createQuoteItem = (
  quoteId: number,
  body: CreateQuoteItemBody
): Promise<QuoteItemModel> => {
  const { notes, ...rest } = body;
  return axios
    .post(`${URL}/${quoteId}/item`, rest)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteItemModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteItemModel>) => response.data)
    .catch(handleAxiosError);
};

const updateQuoteItem = (
  quoteId: number,
  body: QuoteItemModel
): Promise<QuoteItemModel> => {
  const { id, notes, ...options } = body;
  return axios
    .put(`${URL}/${quoteId}/item/${id}`, options)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteItemModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteItemModel>) => response.data)
    .catch(handleAxiosError);
};

const deleteQuoteItem = (
  quoteId: number,
  quoteItemId: number
): Promise<QuoteItemModel> => {
  return axios
    .delete(`${URL}/${quoteId}/item/${quoteItemId}`)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteItemModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteItemModel>) => response.data)
    .catch(handleAxiosError);
};

const createQuoteInfo = (
  quoteId: number,
  body: CreateQuoteInfoBody
): Promise<QuoteInfoModel> => {
  return axios
    .post(`${URL}/${quoteId}/info`, body)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteInfoModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteInfoModel>) => response.data);
};

const updateQuoteInfo = (
  quoteId: number,
  body: CreateQuoteInfoBody
): Promise<QuoteInfoModel> => {
  return axios
    .put(`${URL}/${quoteId}/info`, body)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteInfoModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteInfoModel>) => response.data);
};

const addQuoteTerm = (
  quoteId: number,
  body: Omit<QuoteTermModel, "id">
): Promise<QuoteTermModel> => {
  return axios
    .post(`${URL}/${quoteId}/term`, body)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteTermModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteTermModel>) => response.data);
};

const updateQuoteTerm = (
  quoteId: number,
  body: Omit<QuoteTermModel, "id">
): Promise<QuoteTermModel> => {
  return axios
    .put(`${URL}/${quoteId}/term`, body)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteTermModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteTermModel>) => response.data);
};

const addQuoteAttachment = (
  quoteId: number,
  attachment_id: number
): Promise<QuoteInfoModel> => {
  return axios
    .post(`${URL}/${quoteId}/attachment`, { attachment_id })
    .then(
      (response: AxiosResponse<GenericResponse<QuoteInfoModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteInfoModel>) => response.data);
};

const addQuoteWarranty = (
  quoteId: number,
  warranty: QuoteWarrantyModel
): Promise<QuoteWarrantyModel> => {
  return axios
    .post(`${URL}/${quoteId}/warranty`, warranty)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteWarrantyModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteWarrantyModel>) => response.data);
};

const updateQuoteWarranty = (
  quoteId: number,
  warrantyId: number,
  warranty: Omit<QuoteWarrantyModel, "id">
): Promise<QuoteWarrantyModel> => {
  return axios
    .put(`${URL}/${quoteId}/warranty/${warrantyId}`, warranty)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteWarrantyModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteWarrantyModel>) => response.data);
};

const deleteQuoteWarranty = (
  quoteId: number,
  warrantyId: number
): Promise<QuoteWarrantyModel> => {
  return axios
    .delete(`${URL}/${quoteId}/warranty/${warrantyId}`)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteWarrantyModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteWarrantyModel>) => response.data);
};

const removeAttachment = (
  quoteId: number,
  attachment_id: number
): Promise<QuoteInfoModel> => {
  return axios
    .delete(`${URL}/${quoteId}/attachment/${attachment_id}`)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteInfoModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteInfoModel>) => response.data);
};

const updateCompany = (
  company: CompanyModel
): Promise<CompanyModel | undefined> => {
  return axios
    .put(`${URL}/${company.id}`, company)
    .then(
      (response: AxiosResponse<GenericResponse<CompanyModel>>) => response.data
    )
    .then((response: GenericResponse<CompanyModel>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${URL}/${userId}`).then(() => {});
};

const exportQuotePdf = (quoteId: ID, modelIds: number[]): Promise<void> => {
  const query = modelIds.join(",");
  return axios.get(`${URL}/${quoteId}/export/pdf?item_id=${query}`);
};

const importModelsFile = (quoteId: ID, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("quote_item", file);
  return axios
    .post(`${URL}/${quoteId}/item/import`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response: AxiosResponse<GenericResponse<any>>) => response.data)
    .then((response: GenericResponse<any>) => response.data);
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getQuotes,
  deleteSelectedUsers,
  deleteUser,
  updateCompany,
  createQuote,
  getCompanyById,
  createQuoteItem,
  createQuoteInfo,
  updateQuoteItem,
  updateQuoteInfo,
  updateQuote,
  addQuoteAttachment,
  removeAttachment,
  exportQuotePdf,
  addQuoteWarranty,
  updateQuoteWarranty,
  deleteQuoteWarranty,
  addQuoteTerm,
  updateQuoteTerm,
  importModelsFile,
  deleteQuoteItem,
};
