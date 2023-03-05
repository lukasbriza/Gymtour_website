import { CustomResponse } from "../types";

export const buildResponse = (): CustomResponse => {
  return {
    data: null,
    errorMap: [],
  };
};
