import { getFetchAdress } from "./getFetchAdress";
const fetchAdress = getFetchAdress();

class fetchAgent {
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
    const fetchErrorObj: object = {
      data: null,
      errorMap: [
        {
          Error: {
            code: 400,
            name: "FetchError",
            message:
              "Wrong fetch adress or server is offline. Please contact administrator.",
            trace: "FetchAgent/registerUser",
            date: new Date(),
          },
        },
      ],
    };
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

export default new fetchAgent();
