import { fadeIn } from "@animations";
import { gsap } from "gsap";

export const showHeader = () => {
  const homeHeader = gsap.utils.toArray(".homeHeader");

  const tl = gsap.timeline();
  tl.add(fadeIn(homeHeader, { stagger: 0.3, delay: 0.5, duration: 1 }))
    .add(fadeIn("#pageHeader", { delay: 1.5, duration: 1, displayAfter: "flex" }))
    .add(fadeIn("#homeButton", { delay: 1.5, duration: 1 }));

  return tl;
};
