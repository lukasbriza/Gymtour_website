import { Api } from "@config";
import { getAxiosInstance } from "@libs";
import { GetFilterResponse } from "./_type";
import { CustomErrorResponseObject, hasCustomErrorObject } from "@utils";

export const getFilter = async () => {
  const instance = getAxiosInstance();
  try {
    const response = await instance.get<any, GetFilterResponse>(Api.ApiFilter);
    return response;
  } catch (error: unknown) {
    if (hasCustomErrorObject(error)) {
      (error as CustomErrorResponseObject).errorMap.forEach((err) => {
        console.error(err);
      });
    }
  }
};
