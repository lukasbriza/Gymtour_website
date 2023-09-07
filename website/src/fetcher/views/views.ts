import { AxiosResponse } from "axios";
import { UpdateViews, UpdateViewsResponse } from "./_types";
import { Api, getAxiosInstance } from "src/config";
import { handleFetchError } from "../handleFetchError";

export const updateViews = (props?: UpdateViews) => {
  const { fitness, coach } = props ?? {};
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.put<any, AxiosResponse<UpdateViewsResponse>>(Api.ApiViews, { fitness, coach });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as UpdateViewsResponse);
    }
  };
};
