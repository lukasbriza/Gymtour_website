import { getAxiosInstance } from "src/libs/_index";
import { GetImage, GetImageResponse } from "./_types";
import { getFetchAdress } from "src/utils/_index";
import { Api } from "src/config/_index";
import { AxiosResponse } from "axios";
import { handleFetchError } from "src/fetcher/_index";

export const getImage = ({ id }: GetImage) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<any>>(getFetchAdress() + Api.ApiImages + `?id=${id}`, {
        responseType: "blob",
        timeout: 30000,
      });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as GetImageResponse);
    }
  };
};
