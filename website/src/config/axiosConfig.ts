import { HeadersDefaults } from "axios";

type axiosConfigProps = {
  headers?: HeadersDefaults & { [key: string]: string };
};

export const axiosConfig: axiosConfigProps = {};

export enum Api {
  ApiLogin = "/api-login/login",
  ApiLoginCheck = "/api-login/check",
  ApiUser = "/api-user/user",
  ApiFitness = "/api-fitness/fitness",
  ApiCoach = "/api-coach/coach",
  ApiAdminTop = "/api-admin/top",
  ApiAdminNotification = "/api-admin/notification",
  ApiFilter = "/api-filter/get",
  ApiImages = "/api-images/image",
  ApiViews = "/api-views/views",
}
