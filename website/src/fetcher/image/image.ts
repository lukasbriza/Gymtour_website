import { getAxiosInstance } from "@libs";
import { GetImage, GetImageResponse } from "./_types";
import { getFetchAdress } from "@utils";
import { Api } from "@config";
import { AxiosResponse } from "axios";
import { handleFetchError } from "@fetchers";

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
