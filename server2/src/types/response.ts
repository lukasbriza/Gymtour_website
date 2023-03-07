import { Coach, Filter } from "./abl";
import { ErrorType } from "./error";

export type CustomResponse<T = unknown> = {
  data: T | null;
  errorMap: ErrorType[];
};

export type GetFilterResponsePromise = Promise<CustomResponse<Filter>>;
export type GetFilterResponse = CustomResponse<Filter>;

export type GetCoachResponsePromise = Promise<CustomResponse<Coach[]>>;
export type GetCoachresponse = CustomResponse<Coach[]>;
