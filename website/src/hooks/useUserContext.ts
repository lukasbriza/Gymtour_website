import { useContext } from "react";
import { UserContext } from "src/app/_index";

export const useUsercontext = () => {
  const context = useContext(UserContext);
  return context;
};
