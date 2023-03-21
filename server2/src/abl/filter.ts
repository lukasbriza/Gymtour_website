import { DatabaseError, assignError, buildResponse } from "../utils";
import { Filter, GetFilterResponsePromise } from "./../types";
import { FilterModel } from "../model";
import { getOne } from "../database";
import { errorMessages } from "../config";

export const getFilter = async (): GetFilterResponsePromise => {
  const response = buildResponse<Filter>();

  const data = await getOne<Filter>(FilterModel, errorMessages.getFilter.databaseError, {});

  if (data instanceof DatabaseError) {
    return assignError<Filter>(null, data, response);
  }

  response.data = data;
  return response;
};
