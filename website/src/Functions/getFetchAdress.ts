import { getDevState } from "./getDevState";

const getFetchAdress = () => {
  if (getDevState()) {
    return process.env.REACT_APP_DEVELOPMENT_FETCH_ADRESS;
  } else {
    return process.env.REACT_APP_PRODUCTION_FETCH_ADRESS;
  }
};
export { getFetchAdress };
