import { useContext } from "react";
import { FitnessContext } from "src/app/_index";

export const useFitnessFilterContext = () => {
  const context = useContext(FitnessContext);
  return context;
};
