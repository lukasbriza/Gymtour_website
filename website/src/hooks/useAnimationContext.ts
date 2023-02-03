import { useContext } from "react";
import { AnimationContext } from "src/app/_index";

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  return context;
};
