import { useContext } from "react";
import { FilterContext } from "@app";

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  return context;
};
