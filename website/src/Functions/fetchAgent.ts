import { getFetchAdress } from "./getFetchAdress";
import { getFrontEndFetchErrObj } from "./getFrontEndFetchErrObj";
import { getOptionObject } from "./getOptionObject";
import { fetchCall } from "./fetchCall";
const fetchAdress = getFetchAdress();

class fetchAgent {
  getFilterData() {
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-filter/get";
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: object = getFrontEndFetchErrObj({
      trace: "FetchAgent/getFilterData",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }

  registerUser(data: registerUserData) {
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-login/login";
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    const fetchErrorObj: object = getFrontEndFetchErrObj({
      trace: "FetchAgent/registerUser",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }
}

export default new fetchAgent();
