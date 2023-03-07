import { CustomResponse } from "../types";

export const buildResponse = <T>(): CustomResponse<T | null> => {
  return {
    data: null,
    errorMap: [],
  };
};
