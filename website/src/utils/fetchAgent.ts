import { getFetchAdress } from "./getFetchAdress";
import { getFrontEndFetchErrObj } from "./getFrontEndFetchErrObj";
import { getOptionObject } from "./getOptionObject";
import { fetchCall, fetchCallWithoutParsing } from "./fetchCall";
const fetchAdress = getFetchAdress();

class fetchAgent {
  //////////////////////////////////////////////////////////////////////////
  //FILTER ROUTEST//
  getFilterData() {
    console.log("getFilterData");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-filter/get";
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj<getFilterData_FetchCall[]> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/getFilterData",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<getFilterData_FetchCall[]>(adress, options, fetchErrorObj);
  }
  //////////////////////////////////////////////////////////////////////////
  //USER ROUTEST//
  registerUser(data: registerUserData) {
    console.log("registerUser");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-login/login";
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    const fetchErrorObj: feResponseObj<registerUser_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/registerUser",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<registerUser_FetchCall>(adress, options, fetchErrorObj);
  }
  checkAuthOfUser(data: checkAuthOfUser) {
    console.log("checkAuthOfUser");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-login/check";
    const options = new getOptionObject()
      .setMethod("POST")
      .addHeader("Authorization", data.token)
      .get();
    const fetchErrorObj: feResponseObj<checkAuthOfUser_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/checkAuthOfUser",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<checkAuthOfUser_FetchCall>(adress, options, fetchErrorObj);
  }
  loginUser(data: loginUser) {
    console.log("loginUser");
    ///////////////////////////////////////////////////////
    const adress: string =
      fetchAdress +
      `/api-login/login?username=${data.username}&password=${data.password}`;
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj<loginUser_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/loginUser",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<loginUser_FetchCall>(adress, options, fetchErrorObj);
  }
  getUserInformation(data: userInformation) {
    console.log("getUserInformation");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + `/api-user/user?id=${data.id}`;
    const options = new getOptionObject()
      .setMethod("GET")
      .addHeader("Authorization", data.token)
      .get();
    const fetchErrorObj: feResponseObj<getUserInformation_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/getUserInformation",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<getUserInformation_FetchCall>(
      adress,
      options,
      fetchErrorObj
    );
  }
  changeUserInformation(data: changeInformation) {
    console.log("changeUserInformation");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + `/api-user/user`;
    const options = new getOptionObject()
      .setMethod("PUT")
      .addBody(data)
      .addHeader("Authorization", data.token)
      .get();
    const fetchErrorObj: feResponseObj<changeUserInformation_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/changeUserInformation",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<changeUserInformation_FetchCall>(
      adress,
      options,
      fetchErrorObj
    );
  }
  emailApprove(data: emailApprove) {
    console.log("emailApprove");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + `/emailUpdate/call`;
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    const fetchErrorObj: feResponseObj<emailApprove_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/emailApprove",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<emailApprove_FetchCall>(adress, options, fetchErrorObj);
  }

  //////////////////////////////////////////////////////////////////////////
  //IMAGE ROUTES//
  async getImg(data: getImgData, cb: React.Dispatch<any>) {
    console.log("getImg");
    const adress: string = `http://localhost:3000/api-images/image?id=${data.id}`;
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj<any> = getFrontEndFetchErrObj({
      trace: "FetchAgent/getImg",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    const fetchRes: any = await fetchCallWithoutParsing(
      adress,
      options,
      fetchErrorObj
    );
    const reader = fetchRes.body.getReader();

    let chunks: any = [];
    reader?.read().then(function processBinary({ done, value }: any) {
      if (done) {
        const blob = new Blob([chunks], { type: "image/png" });
        cb(URL.createObjectURL(blob));
        return;
      }

      const tempArray: any = new Uint8Array(chunks?.length + value?.length);
      tempArray.set(chunks);
      tempArray.set(value, chunks.length);
      chunks = tempArray;

      reader.read().then(processBinary);
    });
  }
  //////////////////////////////////////////////////////////////////////////
  //VIEWS ROUTES//
  getViews(id: string, type: "fitness" | "coach") {
    console.log("getViews");
    ///////////////////////////////////////////////////////
    const adress: string =
      fetchAdress + `/api-views/views?type=${type}&_id=${id}`;
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj<getViews_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/getViews",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<getViews_FetchCall>(adress, options, fetchErrorObj);
  }
  updateViews(data: updateViewsData) {
    console.log("updateViews");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-views/views";
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    const fetchErrorObj: feResponseObj<updateViews_FetchCall> =
      getFrontEndFetchErrObj({
        trace: "FetchAgent/getViews",
      });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<updateViews_FetchCall>(adress, options, fetchErrorObj);
  }
  //////////////////////////////////////////////////////////////////////////
  //CONTENT ROUTES//
  async getContentBasedOnFilter(
    body: filterFetchQuery,
    page: "fitness" | "coach"
  ) {
    console.log("getContentBasedOnFilter");
    ///////////////////////////////////////////////////////
    const adress: string =
      fetchAdress + `/api-${page}/${page}?get=${JSON.stringify(body.get)}`;
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj<filteredData[]> = getFrontEndFetchErrObj(
      {
        trace: "FetchAgent/getContentBasedOnFilter",
      }
    );
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall<filteredData[]>(adress, options, fetchErrorObj);
  }
}

export default new fetchAgent();
