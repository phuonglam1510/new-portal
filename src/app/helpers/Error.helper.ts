import { AxiosError } from "axios";

export const handleError = (err: AxiosError) => {
  console.log(err.response);
  if (err.response?.status === 403) {
    window.location.href = "/logout";
  }
  return { data: [], message: err.message };
};
