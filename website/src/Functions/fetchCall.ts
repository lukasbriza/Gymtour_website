function fetchCall<T>(
  adress: string,
  options: RequestInit,
  errorObj: feResponseObj<T>
): Promise<feResponseObj<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const Res: Response = await fetch(adress, options);
      const ResObj: feResponseObj<T> = await Res.json();
      //CATCH THE ERROR//
      if (ResObj.errorMap.length > 0) {
        throw ResObj;
      }
      resolve(ResObj);
    } catch (err: any) {
      //CATCH FE ERROR - DUE TO ERROR IN FETCH//
      if (err instanceof Error) {
        let error = errorObj;
        error.errorMap[0].Error!.message += ", " + err.message;
        resolve(error); //TODO - show err modal
      }
      resolve(err); //TODO - show err modal
    }
  });
}

function fetchCallWithoutParsing<T>(
  adress: string,
  options: RequestInit,
  errorObj: feResponseObj<T>
): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    try {
      const Res: Response = await fetch(adress, options);

      resolve(Res);
      return;
    } catch (err: any) {
      resolve(err); //TODO - show err modal
    }
  });
}

export { fetchCall, fetchCallWithoutParsing };
