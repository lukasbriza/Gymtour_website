import { Api } from "@config";
import { getAxiosInstance } from "@libs";
import { GetFilterResponse } from "./_type";
import { CustomErrorResponseObject, hasCustomErrorObject } from "@utils";
import { AxiosResponse } from "axios";

export const getFilter = async () => {
  const instance = getAxiosInstance();
  try {
    const response = await instance.get<any, AxiosResponse<GetFilterResponse>>(Api.ApiFilter);
    return response.data;
  } catch (error: unknown) {
    if (hasCustomErrorObject(error)) {
      (error as CustomErrorResponseObject).errorMap.forEach((err) => {
        console.error(err);
      });
    }
  }
};
