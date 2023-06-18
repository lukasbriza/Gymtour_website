import { useContext } from "react";
import { CoachContext } from "src/app/_index";

export const useCoachFilterContext = () => {
  const context = useContext(CoachContext);
  return context;
};
