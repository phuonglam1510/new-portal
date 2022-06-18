import axios, { AxiosResponse } from "axios";
import { FileUploadResponse } from "../../../../models/core/FileUploadResponse.type";
import { GenericResponse } from "../../../../models/core/GenericResponse.type";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const URL = `${API_URL}/file`;

const uploadImage = (image: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("files", image);
  return axios
    .post(URL, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then(
      (response: AxiosResponse<GenericResponse<FileUploadResponse[]>>) =>
        response.data
    )
    .then(
      (response: GenericResponse<FileUploadResponse[]>) => response.data[0]
    );
};

export { uploadImage };
