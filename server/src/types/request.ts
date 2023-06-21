import {
  GetCoachType,
  GetFilterType,
  AddCoachType,
  GetFitnessType,
  AddFitnessType,
  RemoveImageType,
  GetImageType,
  RemoveFitnessType,
  RemoveCoachType,
  GetUserType,
  RemoveUserType,
  AddUserType,
  UpdateUserType,
  UpdateFitnessType,
  UpdateCoachType,
  UpdateViewsType,
  AddFitnessLikeType,
  AddCoachLikeType,
} from "./abl";
import { Query } from "express-serve-static-core";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
//FITNESS
export type GetFitnessRequest = TypedRequestQuery<GetFitnessType>;
export type AddFitnessRequest = TypedRequestBody<AddFitnessType>;
export type RemoveFitnessesRequest = TypedRequestBody<RemoveFitnessType>;
export type UpdateFitnessRequest = TypedRequestBody<UpdateFitnessType>;
export type AddFitnessLikeRequest = TypedRequestQuery<AddFitnessLikeType>;

//COACH
export type GetCoachRequest = TypedRequestQuery<GetCoachType>;
export type AddCoachRequest = TypedRequestBody<AddCoachType>;
export type RemoveCoachesRequest = TypedRequestBody<RemoveCoachType>;
export type UpdateCoachRequest = TypedRequestBody<UpdateCoachType>;
export type AddCoachLikeRequest = TypedRequestQuery<AddCoachLikeType>;

//IMAGE
export type RemoveImageRequest = TypedRequestBody<RemoveImageType>;
export type GetImageReqest = TypedRequestQuery<GetImageType>;

//USER
export type GetUserRequest = TypedRequestQuery<GetUserType>;
export type RemoveUserRequest = TypedRequestBody<RemoveUserType>;
export type AddUserRequest = TypedRequestBody<AddUserType>;
export type UpdateUserRequest = TypedRequestBody<UpdateUserType>;

export type GetFilterRequest = TypedRequestBody<GetFilterType>;

export type UpdateViewsRequest = TypedRequestBody<UpdateViewsType>;
