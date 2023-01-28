import { gsap } from "gsap";
import { fadeIn } from "./effects";

export const showcards = () => {
  const tl = gsap.timeline();
  tl.add(fadeIn(".searchItem", { displayInitial: "block", displayAfter: "block", stagger: 0.2, duration: 0.5 }));

  return tl;
};
