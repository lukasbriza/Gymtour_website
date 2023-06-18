import { GridFSFile, UpdateResult } from "mongodb";
import { Coach, Filter, Fitness, ImageFieldsObject, UpdateUserType, User } from "./abl";
import { ErrorType } from "./error";

export type CustomResponse<T = unknown> = {
  data: T | null;
  errorMap: ErrorType[];
};
//FITNESS
export type GetFitnessResponse = CustomResponse<Fitness[]>;
export type GetFitnessResponsePromise = Promise<GetFitnessResponse>;

export type AddFitnessResponse = CustomResponse<boolean>;
export type AddFitnessResponsePromise = Promise<AddFitnessResponse>;

export type RemoveFitnessesResponse = CustomResponse<{ id: string; deleted: boolean }[]>;
export type RemoveFitnessesResponsePromise = Promise<RemoveFitnessesResponse>;

export type UpdateFitnessResponse = CustomResponse<boolean>;
export type UpdateFitnessResponsePromise = Promise<UpdateFitnessResponse>;

export type AddFitnessLikeResponse = CustomResponse<boolean>;
export type AddFitnessLikeRepsonsePromise = Promise<AddFitnessLikeResponse>;

//COACH
export type GetCoachResponse = CustomResponse<Coach[]>;
export type GetCoachResponsePromise = Promise<GetCoachResponse>;

export type AddCoachResponse = CustomResponse<boolean>;
export type AddCoachResponsePromise = Promise<AddCoachResponse>;

export type RemoveCoachesResponse = CustomResponse<{ id: string; deleted: boolean }[]>;
export type RemoveCoachesResponsePromise = Promise<RemoveCoachesResponse>;

export type UpdateCoachResponse = CustomResponse<boolean>;
export type UpdateCoachResponsePromise = Promise<UpdateCoachResponse>;

export type AddCoachLikeResponse = CustomResponse<boolean>;
export type AddCoachLikeResponsePromise = Promise<AddCoachLikeResponse>;

//USER
export type GetUserResponse = CustomResponse<Omit<User, "password">>;
export type GetUserResponsePromise = Promise<GetUserResponse>;

export type RemoveUserResponse = CustomResponse<{ id: string; deleted: boolean }>;
export type RemoveUserResponsePromise = Promise<RemoveUserResponse>;

export type AddUserResponse = CustomResponse<boolean>;
export type AddUserResponsePromise = Promise<AddUserResponse>;

export type UpdateUserResponse = CustomResponse<boolean>;
export type UpdateUserResponsePromise = Promise<UpdateUserResponse>;

//IMAGE
export type UploadImageResponse = CustomResponse<ImageFieldsObject>;
export type UploadImageResponsePromise = Promise<UploadImageResponse>;

export type RemoveImageResponse = CustomResponse<boolean>;
export type RemoveImageResponsePromise = Promise<RemoveImageResponse>;

export type GetImageResponse = CustomResponse<GridFSFile>;
export type GetImageResponsePromise = Promise<GetImageResponse>;

export type GetFilterResponse = CustomResponse<Filter>;
export type GetFilterResponsePromise = Promise<GetFilterResponse>;

export type UpdateViewsResponse = CustomResponse<boolean>;
export type UpdateViewsResponsePromise = Promise<UpdateViewsResponse>;
