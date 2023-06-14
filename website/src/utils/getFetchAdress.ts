import { getDevState } from "./getDevState";

export const getFetchAdress = () => {
  return getDevState()
    ? (process.env.REACT_APP_DEVELOPMENT_FETCH_ADRESS as string)
    : (process.env.REACT_APP_PRODUCTION_FETCH_ADRESS as string);
};
