import { useContext } from "react";
import { UserContext } from "src/app/_index";

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
