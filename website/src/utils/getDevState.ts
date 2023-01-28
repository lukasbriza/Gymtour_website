const getDevState = () => {
  let envDevState = process.env.REACT_APP_DEVELOPMENT;
  if (envDevState === "TRUE" || envDevState !== "FALSE") {
    return true;
  }
};

export { getDevState };
