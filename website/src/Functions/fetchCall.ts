const fetchCall = (adress: string, options: RequestInit, errorObj: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Res = await fetch(adress, options);
      const ResObj = await Res.json();
      resolve(ResObj);
    } catch (err) {
      resolve(errorObj);
    }
  });
};

export { fetchCall };
