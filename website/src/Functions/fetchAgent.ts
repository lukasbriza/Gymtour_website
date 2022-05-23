import { getFetchAdress } from "./getFetchAdress";
const fetchAdress = getFetchAdress();

class fetchAgent {
  getFilterData() {
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-filter/get";
    const options: object = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    };
    const fetchErrorObj: object = getFrontEndFetchErrObj({
      trace: "FetchAgent/getFilterData",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return new Promise(async (resolve, reject) => {
      try {
        const Res = await fetch(adress, options);
        const ResObj = await Res.json();
        resolve(ResObj);
      } catch (err) {
        resolve(fetchErrorObj);
      }
    });
  }
  registerUser(data: registerUserData) {
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-login/login";
    const options: object = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchErrorObj: object = getFrontEndFetchErrObj({
      trace: "FetchAgent/registerUser",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return new Promise(async (resolve, reject) => {
      try {
        const Res = await fetch(adress, options);
        const ResObj = await Res.json();
        resolve(ResObj);
      } catch (err) {
        resolve(fetchErrorObj);
      }
    });
  }
}

const getFrontEndFetchErrObj = (obj: { trace: string }) => {
  return {
    data: null,
    errorMap: [
      {
        Error: {
          code: 400,
          name: "FetchError",
          message:
            "Wrong fetch adress or server is offline. Please contact administrator.",
          trace: obj.trace,
          date: new Date(),
        },
      },
    ],
  };
};
export default new fetchAgent();
