import { FitnessContext } from "@app";
import { useContext } from "react";

export const useFitnessFilterContext = () => {
  const context = useContext(FitnessContext);
  return context;
};
