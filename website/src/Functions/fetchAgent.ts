import { getFetchAdress } from "./getFetchAdress";
import { getFrontEndFetchErrObj } from "./getFrontEndFetchErrObj";
import { getOptionObject } from "./getOptionObject";
import { fetchCall } from "./fetchCall";
const fetchAdress = getFetchAdress();

class fetchAgent {
  //////////////////////////////////////////////////////////////////////////
  //FILTER ROUTEST//
  getFilterData() {
    console.log("getFilterData");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-filter/get";
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/getFilterData",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }
  //////////////////////////////////////////////////////////////////////////
  //USER ROUTEST//
  registerUser(data: registerUserData) {
    console.log("registerUser");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-login/login";
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    console.log(options);
    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/registerUser",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }

  //////////////////////////////////////////////////////////////////////////
  //IMAGE ROUTES//
  async getImg(data: getImgData, cb: React.Dispatch<any>) {
    console.log("getImg");
    const adress: string = `http://localhost:3000/api-images/image?id=${data.id}`;
    const options = new getOptionObject().setMethod("GET").get();

    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/getImg",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    const fetchRes: any = await fetchCall(
      adress,
      options,
      fetchErrorObj,
      false
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
  //VIEWS ROUTES// ?????
  getViews(id: string, type: "fitness" | "coach") {
    console.log("getViews");
    ///////////////////////////////////////////////////////
    const adress: string =
      fetchAdress + `/api-views/views?type=${type}&_id=${id}`;
    const options = new getOptionObject().setMethod("GET").get();
    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/getViews",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }
  updateViews(data: updateViewsData) {
    console.log("updateViews");
    ///////////////////////////////////////////////////////
    const adress: string = fetchAdress + "/api-views/views";
    const options = new getOptionObject().setMethod("POST").addBody(data).get();
    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/getViews",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
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
    const fetchErrorObj: feResponseObj = getFrontEndFetchErrObj({
      trace: "FetchAgent/getContentBasedOnFilter",
    });
    ///////////////////////////////////////////////////////
    //FETCH CALL//
    return fetchCall(adress, options, fetchErrorObj);
  }
}

export default new fetchAgent();
