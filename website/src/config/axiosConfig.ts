import { HeadersDefaults } from "axios";

type axiosConfigProps = {
  headers?: HeadersDefaults & { [key: string]: string };
};

export const axiosConfig: axiosConfigProps = {};

export enum Api {
  ApiLogin = "/api/login",
  ApiLoginCheck = "/api/check",
  ApiUser = "/api/user",
  ApiFitness = "/api/fitness",
  ApiCoach = "/api/coach",
  ApiFilter = "/api/filter",
  ApiImages = "/api/image",
  ApiViews = "/api/views",
}
