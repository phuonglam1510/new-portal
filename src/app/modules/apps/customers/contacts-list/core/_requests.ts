import axios, { AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import {
  handleAxiosError,
  handleError,
} from "../../../../../helpers/Error.helper";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { ID } from "../../../../../models/core/ID.type";
import { ContactModel } from "../../../../../models/customers/Contact.class";
import { ContactQueryResponse } from "./_models";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const CONTACT_URL = `${API_URL}/contact`;

const getContacts = (query: string): Promise<ContactQueryResponse> => {
  return axios
    .get(`${CONTACT_URL}?${query}`)
    .then((d: AxiosResponse<ContactQueryResponse>) => {
      const contacts =
        d.data?.data?.map((itemJson) =>
          Builder(ContactModel, itemJson).build()
        ) || [];
      return { data: contacts, messages: "" };
    })
    .catch(handleError);
};

const getContactById = (id: ID): Promise<ContactModel | undefined> => {
  return axios
    .get(`${CONTACT_URL}/${id}`)
    .then(
      (response: AxiosResponse<GenericResponse<ContactModel>>) => response.data
    )
    .then((response: GenericResponse<ContactModel>) =>
      Builder(ContactModel, response.data).build()
    );
};

const createContact = (
  contact: ContactModel
): Promise<ContactModel | undefined> => {
  const { company, ...rest } = contact;
  return axios
    .post(CONTACT_URL, rest)
    .then(
      (response: AxiosResponse<GenericResponse<ContactModel>>) => response.data
    )
    .then((response: GenericResponse<ContactModel>) => response.data)
    .catch(handleAxiosError);
};

const updateContact = (
  contact: ContactModel
): Promise<ContactModel | undefined> => {
  const { company, ...rest } = contact;

  return axios
    .put(`${CONTACT_URL}/${contact.id}`, rest)
    .then(
      (response: AxiosResponse<GenericResponse<ContactModel>>) => response.data
    )
    .then((response: GenericResponse<ContactModel>) => response.data)
    .catch(handleAxiosError);
};

const deleteContact = (id: number): Promise<void> => {
  return axios
    .delete(`${CONTACT_URL}/${id}`)
    .then(() => {})
    .catch(handleAxiosError);
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${CONTACT_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getContacts,
  deleteSelectedUsers,
  deleteContact,
  updateContact,
  createContact,
  getContactById,
};
