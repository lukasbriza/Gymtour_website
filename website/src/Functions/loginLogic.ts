import { getLocal, setLocal, removeLocal } from "../Functions/localStorage";
import { storageAvailable } from "../Functions/storageAvaliable";
import fetchAgent from "../Functions/fetchAgent";

const isLogged = async () => {
  if (storageAvailable("localStorage")) {
    const userToken = getLocal("gymtour.cz_token");
    //IS THERE TOKEN KEY??//
    if (userToken !== null) {
      //SEND REQUEST WITH TOKEN FROM LOCAL STORAGE
      const response: any = await fetchAgent.checkAuthOfUser({
        token: userToken,
      });
      //WAS TOKEN CORRECT?//
      if (response.errorMap.length > 0) {
        alert("Token is invalid. Please contact administrator.");
        return { logged: false, userId: null };
      }

      if (response.data.authenticated === false) {
        return { logged: false, userId: null };
      } else if (response.data.authenticated === true) {
        return { logged: true, userId: response.data.userData.userId };
      }
    } else {
      //REDIRECT
      return { logged: false, userId: null };
    }
  } else {
    alert("Local storage is not available, please contact administrator");
    return { logged: false, userId: null };
  }
};

const saveToken = async (token: string) => {
  setLocal("gymtour.cz_token", token);
};

const removeToken = async () => {
  removeLocal("gymtour.cz_token");
};

export { isLogged, saveToken, removeToken };
