import { Api, getAxiosInstance } from "src/config";
import { FilterType, GetFilterResponse } from "./_types";
import { hasCustomErrorObject } from "src/utils";
import { AxiosResponse } from "axios";
import { handleFetchError } from "../handleFetchError";

export const getFilter = () => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<GetFilterResponse>>(Api.ApiFilter);
      return response.data;
    } catch (error: unknown) {
      if (hasCustomErrorObject(error)) {
        handleFetchError<FilterType>(error as GetFilterResponse);
      }
    }
  };
};
