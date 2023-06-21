import { FC, useContext } from "react";
import { ErrorHandlerProps } from "./_types";
import { PopUpContext } from "@lukasbriza/lbui-lib";
import { getAxiosInstance } from "src/libs/_index";
import { ApiError, DatabaseError, ErrorMapType, ErrorTypesArray, NetworkError, UnhandledError, UnprocesableError, ValidationError } from "src/utils/_index";

export const AxiosHandler: FC<ErrorHandlerProps> = ({ children }) => {
  const { show, unMount } = useContext(PopUpContext);

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
      const data: unknown = response.data

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
        //UNPROCESSABLE ERROR
        if (status === 422) {
          errorArray.push(new UnprocesableError(err))
        }
        errorArray.push(new UnhandledError(err));
        return;
      });

      const customErrorResponse = {
        data: data,
        errorMap: errorArray,
      };

      return customErrorResponse;
    }
  );

  return <>{children}</>;
};
