import { APIError, DatabaseError, ValidationError } from "../utils";
import { Filter } from "./abl";

export type ErrorType =
  | typeof ValidationError
  | typeof DatabaseError
  | typeof APIError
  | [];

export type CustomResponse<T = unknown> = {
  data: T;
  errorMap: ErrorType[];
};

export type GetFilterResponse = Promise<CustomResponse<Filter>>;
