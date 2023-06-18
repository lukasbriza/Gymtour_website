import { CustomErrorResponseObject, hasCustomErrorObject } from "src/utils/_index";

export const handleFetchError = <T>(error: CustomErrorResponseObject<T>) => {
  if (hasCustomErrorObject(error)) {
    error.errorMap.forEach((err) => {
      console.error(err);
    });
  }
};
