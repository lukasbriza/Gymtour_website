export const getDevState = () => {
  const envDevState = process.env.REACT_APP_DEVELOPMENT;
  return envDevState === "TRUE" || envDevState === "true";
};
