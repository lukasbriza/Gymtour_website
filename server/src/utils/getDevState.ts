export const getDevState = () => {
  return process.env.DEVELOPMENT_STATE === "true";
};
