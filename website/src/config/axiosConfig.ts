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
  ApiFitnessLike = "/api/fitness/like",
  ApiCoach = "/api/coach",
  ApiCoachLike = "/api/coach/like",
  ApiFilter = "/api/filter",
  ApiImages = "/api/images",
  ApiViews = "/api/views",
}
