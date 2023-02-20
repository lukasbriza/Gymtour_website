import { axiosConfig } from "@config";
import { getDevState } from "@utils";
import axios, { AxiosInstance } from "axios";

let axiosInstance: undefined | AxiosInstance = undefined;

export const configureAxios = () => {
  axiosInstance = axios.create({
    baseURL: getDevState()
      ? process.env.REACT_APP_DEVELOPMENT_FETCH_ADRESS
      : process.env.REACT_APP_PRODUCTION_FETCH_ADRESS,
    timeout: 10000,
    headers: { ...axiosConfig.headers },
  });
};

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    configureAxios();
  }
  return axiosInstance as AxiosInstance;
};
