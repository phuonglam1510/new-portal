import axios, { AxiosResponse } from "axios";
import { Builder } from "builder-pattern";
import { GenericResponse } from "../../../../../models/core/GenericResponse.type";
import { QuoteInfoModel } from "../../../../../models/sales/QuoteInfo.model";
import { QuoteItemModel } from "../../../../../models/sales/QuoteItem.model";
import { QuoteDetailModel } from "./_models";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const URL = `${API_URL}/quote`;

const getQuoteDetail = (id: string): Promise<QuoteDetailModel> => {
  return axios
    .get(`${URL}/${id}`)
    .then(
      (response: AxiosResponse<GenericResponse<QuoteDetailModel>>) =>
        response.data
    )
    .then((response: GenericResponse<QuoteDetailModel>) =>
      Builder(QuoteDetailModel, response.data)
        .quote_info(
          response.data.quote_info
            ? Builder(QuoteInfoModel, response.data.quote_info).build()
            : undefined
        )
        .quote_items(
          response.data.quote_items?.map((item) =>
            Builder(QuoteItemModel, item).build()
          ) || []
        )
        .build()
    );
};

export { getQuoteDetail };
