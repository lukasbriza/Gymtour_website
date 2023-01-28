import { useContext } from "react";
import { UserContext } from "@app";

export const useUsercontext = () => {
  const context = useContext(UserContext);
  return context;
};
