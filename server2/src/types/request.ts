import {
  GetCoachType,
  GetFilterType,
  AddCoachType,
  GetFitnessType,
  AddFitnessType,
  RemoveImageType,
  GetImageType,
  RemoveFitnessType,
} from "./abl";
import { Query } from "express-serve-static-core";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export type GetFilterRequest = TypedRequestBody<GetFilterType>;

export type GetCoachRequest = TypedRequestQuery<GetCoachType>;

export type AddCoachRequest = TypedRequestBody<AddCoachType>;

export type GetFitnessRequest = TypedRequestQuery<GetFitnessType>;

export type AddFitnessRequest = TypedRequestBody<AddFitnessType>;

export type RemoveImageRequest = TypedRequestBody<RemoveImageType>;

export type GetImageReqest = TypedRequestQuery<GetImageType>;

export type RemoveFitnessesRequest = TypedRequestBody<RemoveFitnessType>;
