import { axiosConfig } from "src/config/_index";
import { getDevState } from "src/utils/_index";
import axios, { AxiosInstance } from "axios";

let axiosInstance: undefined | AxiosInstance = undefined;

export const configureAxios = () => {
  axiosInstance = axios.create({
    baseURL: getDevState()
      ? process.env.REACT_APP_DEVELOPMENT_FETCH_ADRESS
      : process.env.REACT_APP_PRODUCTION_FETCH_ADRESS,
    timeout: 12000,
    headers: { ...axiosConfig.headers },
  });
};

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    configureAxios();
    console.log(axiosInstance);
  }

  return axiosInstance as AxiosInstance;
};
