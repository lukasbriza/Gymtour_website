import { AnimationContext } from "@app";
import { useContext } from "react";

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  return context;
};
