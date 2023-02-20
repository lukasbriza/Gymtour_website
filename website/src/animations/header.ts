import { fadeIn } from "@animations";
import { gsap } from "gsap";

export const showHeader = () => {
  const homeHeader = gsap.utils.toArray(".homeHeader");

  const tl = gsap.timeline();
  tl.addLabel("start")
    .add(fadeIn(homeHeader, { stagger: 0.3, delay: 0, duration: 1.1 }), "start")
    .add("afterHeaders")
    .add(
      fadeIn("#pageHeader", {
        duration: 1,
        displayInitial: "flex",
        displayAfter: "flex",
      }),
      "afterHeaders"
    )
    .add(fadeIn("#homeButton", { duration: 1 }), "afterHeaders");

  return tl;
};
