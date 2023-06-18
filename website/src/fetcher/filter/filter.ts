import { Api } from "src/config/_index";
import { getAxiosInstance } from "src/libs/_index";
import { FilterType, GetFilterResponse } from "./_types";
import { hasCustomErrorObject } from "src/utils/_index";
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
