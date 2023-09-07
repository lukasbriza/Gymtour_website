import { GetImage, GetImageResponse, PostImage } from "./_types";
import { getFetchAdress } from "src/utils";
import { Api, getAxiosInstance } from "src/config";
import { AxiosResponse } from "axios";
import { handleFetchError } from "src/fetcher";

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

export const postImage = (props?: PostImage) => {
  const { image, key } = props ?? {}
  const instance = getAxiosInstance();
  return async () => {
    try {

      const data = new FormData()

      const response = await instance.post(getFetchAdress() + Api.ApiImages, {}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error: unknown) {

    }
  }
}
