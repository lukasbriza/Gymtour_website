import { getAxiosInstance } from "src/libs/_index";
import {
  AddCoachBody,
  AddCoachLikeQuery,
  AddCoachLikeResponse,
  AddCoachResponse,
  CoachFilterQuery,
  GetCoach,
  GetCoachesResponse,
  RemoveCoaches,
  RemoveCoachesBody,
  RemoveCoachesResponse,
  UpdateCoachBody,
  UpdateCoachResponse,
} from "./_types";
import { Api } from "src/config/_index";
import { handleFetchError } from "../handleFetchError";
import { AxiosResponse } from "axios";
import { querySerialize } from "../querySerialize";

export const getCoaches = (query?: CoachFilterQuery) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<GetCoachesResponse>>(
        `${Api.ApiCoach}?${querySerialize(query ?? {})}`
      );
      return response.data;
    } catch (error: unknown) {
      handleFetchError<GetCoach>(error as GetCoachesResponse);
    }
  };
};

export const removeCoaches = (id?: RemoveCoachesBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.delete<any, AxiosResponse<RemoveCoachesResponse>>(Api.ApiCoach, { data: id });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<RemoveCoaches>(error as RemoveCoachesResponse);
    }
  };
};

export const addCoach = (body: AddCoachBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.post<any, AxiosResponse<AddCoachResponse>>(Api.ApiCoach, { ...body });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as AddCoachResponse);
    }
  };
};

export const updateCoach = (body: UpdateCoachBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.put(Api.ApiCoach, { ...body });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as UpdateCoachResponse);
    }
  };
};

export const addCoachLike = (query?: AddCoachLikeQuery) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<AddCoachLikeResponse>>(
        `${Api.ApiCoachLike}?${querySerialize(query ?? {})}`
      );
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as AddCoachLikeResponse);
    }
  };
};
