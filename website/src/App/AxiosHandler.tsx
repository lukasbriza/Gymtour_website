import { FC } from "react";
import { ErrorHandlerProps } from "./_types";
import { getAxiosInstance } from "src/libs/_index";
import { usePopUpContext } from "src/hooks/_index";

export const AxiosHandler: FC<ErrorHandlerProps> = ({ children }) => {
  const { error: showError } = usePopUpContext()

  const axiosInstance = getAxiosInstance();

  axiosInstance.interceptors.response.use(
    (success) => {
      return success;
    },
    (error) => {
      showError({
        header: `Error: ${error.code}`,
        text: error.message
      })

      if (error?.response?.data?.errorMap) {
        const arr: Error[] = error?.response?.data?.errorMap

        arr.forEach((err) => {
          showError({ header: `API error`, text: err.message })
          throw new Error(err?.message ?? "")
        })
      }

      return error
    }
  );

  return <>{children}</>;
};
