import { useContext } from "react";
import { AppContext } from "../app/_index";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
