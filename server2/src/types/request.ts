import { GetFilterType } from "./abl";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export type GetFilterRequest = TypedRequestBody<GetFilterType>;
