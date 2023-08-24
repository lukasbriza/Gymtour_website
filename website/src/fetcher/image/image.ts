import { getAxiosInstance } from "src/libs/_index";
import { GetImage, GetImageResponse } from "./_types";
import { getFetchAdress } from "src/utils/_index";
import { Api } from "src/config/_index";
import { AxiosResponse } from "axios";
import { handleFetchError } from "src/fetcher/_index";

export const getImage = (props?: GetImage) => {
  const { id } = props ?? {};
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<Blob>>(getFetchAdress() + Api.ApiImages + `?id=${id}`, {
        responseType: "blob",
        timeout: 30000,
      });
      return { blob: response.data, fileName: response.headers["x-file-name"] };
    } catch (error: unknown) {
      handleFetchError<boolean>(error as GetImageResponse);
    }
  };
};
