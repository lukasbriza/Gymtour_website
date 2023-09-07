import { CustomErrorResponseObject, hasCustomErrorObject } from "src/utils";

export const handleFetchError = <T>(error: CustomErrorResponseObject<T>) => {
  if (hasCustomErrorObject(error)) {
    error.errorMap.forEach((err) => {
      console.error(err);
    });
  }
};
