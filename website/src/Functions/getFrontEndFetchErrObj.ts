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

export { getFrontEndFetchErrObj };
