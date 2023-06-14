import { gsap } from "gsap";
import { fadeIn } from "./effects";

export const emailUpdateShow = () => {
  const tl = gsap.timeline();
  tl.add(fadeIn(".emailUpdateWrapper", { displayInitial: "none", displayAfter: "flex", stagger: 0 }));

  return tl;
};
