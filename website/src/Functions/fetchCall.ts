const fetchCall = (
  adress: string,
  options: RequestInit,
  errorObj: feResponseObj,
  parse: boolean = true
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Res: Response = await fetch(adress, options);
      if (parse === false) {
        resolve(Res);
        return;
      }
      const ResObj: feResponseObj = await Res.json();
      //CATCH BE ERROR//
      if (ResObj.errorMap.length > 0) {
        throw ResObj;
      }
      resolve(ResObj);
    } catch (err) {
      //CATCH FE ERROR - DUE TO ERROR IN FETCH//
      if (err instanceof Error) {
        let error = errorObj;
        error.errorMap[0].Error!.message += ", " + err.message;
        resolve(error); //TODO - show err modal
      }
      resolve(err); //TODO - show err modal
    }
  });
};

export { fetchCall };
