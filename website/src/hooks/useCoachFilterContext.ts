import { CoachContext } from "@app";
import { useContext } from "react";

export const useCoachFilterContext = () => {
  const context = useContext(CoachContext);
  return context;
};
