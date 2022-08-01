import axios, { AxiosError, AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import { ID, Response } from "../../../../../../_metronic/helpers";
import {
  handleAxiosError,
  handleError,
} from "../../../../../helpers/Error.helper";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { ChangePasswordForm } from "../../../../../models/users/ChangePassword.interface";
import { User } from "../../../../../models/users/User.interface";
import { UsersQueryResponse } from "./_models";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `${API_URL}/user`;

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => {
      const users =
        d.data?.data?.map((userJson) => Builder(User, userJson).build()) || [];
      return { data: users, messages: "" };
    })
    .catch(handleError);
};

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) =>
      Builder(User, response.data)
        .avatarForEdit(response.data?.avatar?.file_url)
        .build()
    );
};

const createUser = (user: User): Promise<User | undefined> => {
  delete user.avatar;
  return axios
    .post(USER_URL, user)
    .then((response: AxiosResponse<GenericResponse<User>>) => response.data)
    .then((response: GenericResponse<User>) => response.data)
    .catch(handleAxiosError);
};

const updateUser = (user: User): Promise<User | undefined> => {
  delete user.avatar;
  return axios
    .put(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<GenericResponse<User>>) => response.data)
    .then((response: GenericResponse<User>) => response.data)
    .catch(handleAxiosError);
};

const updatePassword = (form: ChangePasswordForm): Promise<any> => {
  return axios
    .post(`${USER_URL}/password/change`, form)
    .then((response: AxiosResponse<GenericResponse<any>>) => response.data)
    .then((response: GenericResponse<any>) => response.data)
    .catch((err: AxiosError) => {
      throw new Error(err.response?.data?.message[0] || "Error");
    });
};

const deleteUser = (userId: ID): Promise<void> => {
  return axios
    .delete(`${USER_URL}/${userId}`)
    .then(() => {})
    .catch(handleAxiosError);
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  updatePassword,
};
