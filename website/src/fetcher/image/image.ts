import { GetImage, GetImageResponse, PostImage, PostImages, PostImagesResponse, RemoveImages, RemoveImagesResponse } from "./_types";
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

export const postImage = (props?: PostImages) => {
  const { card, main, others } = props ?? {}
  const instance = getAxiosInstance();

  return async () => {
    try {
      const data = new FormData()
      card && data.append("card", card)
      main && data.append("main", main)
      if (others) {
        others.forEach((file) => {
          data.append("others", file)
        })
      }
      const response = await instance.post<any, AxiosResponse<PostImagesResponse>>(getFetchAdress() + Api.ApiImages, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      const { card: cardResult, main: mainResult, others: othersResult } = response.data.data ?? {}

      return {
        card: cardResult?.[0].id,
        detail: {
          main: mainResult?.[0].id,
          others: othersResult?.map((res) => res.id) ?? []
        }
      }
    } catch (error: unknown) {
      handleFetchError<PostImage>(error as PostImagesResponse)
    }
  }
}

export const removeImage = (props?: RemoveImages) => {
  const instance = getAxiosInstance();

  return async () => {
    try {
      const response = await instance.delete<any, AxiosResponse<RemoveImagesResponse>>(getFetchAdress() + Api.ApiImages, { data: { ids: props?.ids } })
      return response.data
    } catch (error) {
      handleFetchError<boolean>(error as RemoveImagesResponse);
    }
  }
}
