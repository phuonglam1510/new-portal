import { AxiosError } from "axios";
declare var Swal: any;

export const handleError = (err: AxiosError) => {
  console.log(err.response);
  if (err.response?.status === 403) {
    window.location.href = "/logout";
  }
  return { data: [], message: err.message };
};

export const handleAxiosError = (err: AxiosError) => {
  console.log(err.response);
  if (err.response?.status === 403) {
    window.location.href = "/logout";
  }
  const errorMessage = err.response?.data?.message?.join("\n");
  throw new Error(errorMessage || "Unknown Error");
};

export const showError = (message: string) =>
  Swal.fire({
    text: message,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Đóng",
    customClass: {
      confirmButton: "btn btn-danger",
    },
  });
