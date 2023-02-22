import { useContext } from "react";
import { AppContext } from "@app";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
