import { CustomResponse, ErrorType } from "../types";

export const assignError = <T>(dataValue: T, error: ErrorType | ErrorType[], responseObject: CustomResponse<T>) => {
  responseObject.data = dataValue;
  if (Array.isArray(error)) {
    responseObject.errorMap = [...responseObject.errorMap, ...error];
  } else {
    responseObject.errorMap.push(error);
  }
  return responseObject;
};
