import { GridFSFile } from "mongodb";
import { Coach, Filter, Fitness, ImageFieldsObject } from "./abl";
import { ErrorType } from "./error";

export type CustomResponse<T = unknown> = {
  data: T | null;
  errorMap: ErrorType[];
};

export type GetFilterResponse = CustomResponse<Filter>;
export type GetFilterResponsePromise = Promise<GetFilterResponse>;

export type GetCoachResponse = CustomResponse<Coach[]>;
export type GetCoachResponsePromise = Promise<GetCoachResponse>;

export type AddCoachResponse = CustomResponse<boolean>;
export type AddCoachResponsePromise = Promise<AddCoachResponse>;

export type GetFitnessResponse = CustomResponse<Fitness[]>;
export type GetFitnessResponsePromise = Promise<GetFitnessResponse>;

export type AddFitnessResponse = CustomResponse<boolean>;
export type AddFitnessResponsePromise = Promise<AddFitnessResponse>;

export type RemoveFitnessesResponse = CustomResponse<{ id: string; deleted: boolean }[]>;
export type RemoveFitnessesResponsePromise = Promise<RemoveFitnessesResponse>;

export type UploadImageResponse = CustomResponse<ImageFieldsObject>;
export type UploadImageResponsePromise = Promise<UploadImageResponse>;

export type RemoveImageResponse = CustomResponse<boolean>;
export type RemoveImageResponsePromise = Promise<RemoveImageResponse>;

export type GetImageResponse = CustomResponse<GridFSFile>;
export type GetImageResponsePromise = Promise<GetImageResponse>;
