import { useContext } from "react";
import { AnimationContext } from "@app";

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  return context;
};
