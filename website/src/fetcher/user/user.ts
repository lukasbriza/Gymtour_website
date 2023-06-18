import { getAxiosInstance } from "src/libs/_index";
import {
  AddUser,
  AddUserResponse,
  DeleteUser,
  DeleteUserResponse,
  GetUserResponse,
  UpdateUser,
  UpdateUserResponse,
  User,
} from "./_types";
import { AxiosResponse } from "axios";
import { Api } from "src/config/_index";
import { handleFetchError } from "../handleFetchError";
import { querySerialize } from "../querySerialize";

export const getUser = (id: string) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.get<any, AxiosResponse<GetUserResponse>>(
        `${Api.ApiUser}?${querySerialize({ id: id })}`
      );
      return response.data;
    } catch (error: unknown) {
      handleFetchError<User>(error as GetUserResponse);
    }
  };
};

export const removeUser = (id: string) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.delete<any, AxiosResponse<DeleteUserResponse>>(Api.ApiUser, {
        params: { id: id },
      });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<DeleteUser>(error as DeleteUserResponse);
    }
  };
};

export const addUser = (user: AddUser) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.post<any, AxiosResponse<AddUserResponse>>(Api.ApiUser, { ...user });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as AddUserResponse);
    }
  };
};

export const updateUser = async (user: UpdateUser) => {
  const instance = getAxiosInstance();
  return async () => {
    try {
      const response = await instance.put<any, AxiosResponse<UpdateUserResponse>>(Api.ApiUser, { ...user });
      return response.data;
    } catch (error: unknown) {
      handleFetchError<boolean>(error as AddUserResponse);
    }
  };
};
