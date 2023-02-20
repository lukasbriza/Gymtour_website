import { FC, useContext } from "react";
import { ErrorHandlerProps } from "./_types";
import {
  ApiError,
  CustomErrorResponseObject,
  DatabaseError,
  ErrorMapType,
  ErrorTypesArray,
  NetworkError,
  UnhandledError,
  ValidationError,
} from "@utils";
import { PopUpContext } from "@lukasbriza/lbui-lib";
import { configureAxios, getAxiosInstance } from "@libs";

export const AxiosHandler: FC<ErrorHandlerProps> = ({ children }) => {
  const { show, unMount } = useContext(PopUpContext);

  configureAxios();
  const axiosInstance = getAxiosInstance();

  axiosInstance.interceptors.response.use(
    (success) => {
      return success;
    },
    (error) => {
      const errorArray: ErrorTypesArray = [];
      //HANDLE NETWORK ERROR
      if (error.code === "ERR_NETWORK") {
        errorArray.push(new NetworkError());
        return { data: null, errorMap: errorArray };
      }

      const status = error.response.status;
      const response = error.response.data;

      const errorMap: ErrorMapType = response.errorMap;

      errorMap.forEach((err) => {
        //API ERROR
        if (status === 400) {
          errorArray.push(new ApiError(err));
          return;
        }
        //VALIDATION ERROR
        if (status === 406) {
          errorArray.push(new ValidationError(err));
          return;
        }
        //DATABASE ERROR
        if (status === 409) {
          errorArray.push(new DatabaseError(err));
          return;
        }
        errorArray.push(new UnhandledError(err));
        return;
      });

      const customErrorResponse: CustomErrorResponseObject = {
        data: null,
        errorMap: errorArray,
      };

      return customErrorResponse;
    }
  );

  return <>{children}</>;
};
