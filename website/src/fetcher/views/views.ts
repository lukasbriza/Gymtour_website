import { getAxiosInstance } from "src/libs/_index";
import { AxiosResponse } from "axios";
import { UpdateViews, UpdateViewsResponse } from "./_types";
import { Api } from "src/config/_index";
import { handleFetchError } from "../handleFetchError";

export const updateViews = ({ fitness, coach }: UpdateViews) => {
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
