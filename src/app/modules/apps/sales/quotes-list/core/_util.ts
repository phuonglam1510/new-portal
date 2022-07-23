import { QuoteFormModel } from "../new-quote/quoteCreationSchemas";
import store from "../../../../../../setup/redux/Store";

export const pickBody = ({
  contact_id,
  type,
  delivery_address,
  package_quality,
  sale_signature_id,
  order_confirmation_id,
  head_signature_id,
  deliver_record_id,
  status,
}: QuoteFormModel) => ({
  contact_id,
  type,
  delivery_address,
  package_quality,
  sale_signature_id,
  order_confirmation_id,
  head_signature_id,
  deliver_record_id,
  status,
});

export const fileKeyMap: {
  [key: string]:
    | "sale_signature_id"
    | "head_signature_id"
    | "order_confirmation_id";
} = {
  sale_signature: "sale_signature_id",
  order_confirmation: "order_confirmation_id",
  head_signature: "head_signature_id",
};

export const loadAndOpenPdfFile = async (
  url: string,
  fileType: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    const {
      auth: { accessToken },
    } = store.getState();
    oReq.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    oReq.responseType = "arraybuffer";

    oReq.onload = () => {
      const blob = new Blob([oReq.response], { type: fileType });
      const URL = window.URL || window.webkitURL;
      const dataUrl = URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = dataUrl;
      a.download = "bao_gia.pdf";
      a.target = "_blank";
      a.click();
      resolve(dataUrl);
    };
    oReq.onerror = () => {
      reject(new Error("Fail to load content"));
    };
    oReq.send();
  });
};
