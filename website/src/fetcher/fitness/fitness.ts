import { getAxiosInstance } from "@libs";
import { Api } from "@config";
import { handleFetchError } from "../handleFetchError";
import { AxiosResponse } from "axios";
import {
  AddFitnessBody,
  AddFitnessResponse,
  FitnesFilterQuery,
  GetFitness,
  GetFitnessResponse,
  RemoveFitnesses,
  RemoveFitnessesBody,
  RemoveFitnessesResponse,
  UpdateFitnessBody,
  UpdateFitnessResponse,
} from "./_types";
import { querySerialize } from "../querySerialize";

export const getFitnesses = (query: FitnesFilterQuery) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<GetFitnessResponse>>(
        `${Api.ApiFitness}?${querySerialize(query)}`
      );
      return response.data;
    } catch (error: unknown) {
      handleFetchError<GetFitness>(error as GetFitnessResponse);
    }
  };
};

export const removeFitnesses = (id: RemoveFitnessesBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.delete<any, AxiosResponse<RemoveFitnessesResponse>>(Api.ApiFitness, { data: id });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<RemoveFitnesses>(error as RemoveFitnessesResponse);
    }
  };
};

export const updateFitness = (body: UpdateFitnessBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.put<any, AxiosResponse<UpdateFitnessResponse>>(Api.ApiFitness, { ...body });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as UpdateFitnessResponse);
    }
  };
};

export const addFitness = (body: AddFitnessBody) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.post<any, AxiosResponse<AddFitnessResponse>>(Api.ApiFitness, { ...body });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as AddFitnessResponse);
    }
  };
};
