import { gsap } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const hamburgerOn = (slice1: HTMLDivElement, slice2: HTMLDivElement, slice3: HTMLDivElement) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(
      slice1,
      {
        transformOrigin: "left",
        transform: "rotate(45deg) translateY(-1px)",
        duration: 0.3,
        ease: "linear",
      },
      "start"
    )
    .to(
      slice2,
      {
        height: "0px",
        opacity: 0,
        duration: 0.3,
        ease: "linear",
      },
      "start"
    )
    .to(
      slice3,
      {
        transformOrigin: "left",
        transform: "rotate(-45deg) translateY(1px)",
        duration: 0.3,
        ease: "linear",
      },
      "start"
    );

  return tl;
};

export const hamburgerOff = (slice1: HTMLDivElement, slice2: HTMLDivElement, slice3: HTMLDivElement) => {
  const tl = gsap.timeline();
  tl.addLabel("strat")
    .to(
      slice1,
      { transformOrigin: "left", transform: "rotate(0deg) translateY(0px)", duration: 0.3, ease: "linear" },
      "start"
    )
    .to(slice2, { height: "5px", opacity: 1, duration: 0.3, ease: "linear" }, "start")
    .to(
      slice3,
      { transformOrigin: "left", transform: "rotate(0deg) translateY(0px)", duration: 0.3, ease: "linear" },
      "start"
    );

  return tl;
};

export const menuShiftOn = (
  sideBar: HTMLElement,
  menuTrigger: HTMLDivElement,
  slice1: HTMLDivElement,
  slice2: HTMLDivElement,
  slice3: HTMLDivElement
) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(sideBar, { width: "100%", duration: 2, ease: Power3.easeOut }, "start")
    .to(menuTrigger, { backgroundColor: "transparent", duration: 0.5, ease: "linear" }, "start")
    .to(menuTrigger, { right: "10px", duration: 0.5, ease: Power3.easeOut }, "start")
    .to([slice1, slice2, slice3], { backgroundColor: "white", duration: 0.5, ease: "linear" }, "start")
    .add(fadeIn(".sideBarItem", { displayAfter: "initial" }), "+=0.75");

  return tl;
};

export const menuShiftOff = (
  sideBar: HTMLElement,
  menuTrigger: HTMLDivElement,
  slice1: HTMLDivElement,
  slice2: HTMLDivElement,
  slice3: HTMLDivElement
) => {
  const arr = gsap.utils.toArray(".sideBarItem").reverse();
  const tl = gsap.timeline();
  tl.add(fadeOff(arr, { delay: 0, displayAfter: "none", stagger: 0.1 }))
    .addLabel("start")
    .to(sideBar, { width: "0%", duration: 2, delay: 1, ease: Power2.easeOut }, "start")
    .to(menuTrigger, { backgroundColor: "white", delay: 1.5, duration: 0.5, ease: Power2.easeOut }, "start")
    .to(menuTrigger, { right: "-70px", duration: 1, delay: 1.3, ease: "linear" }, "start")
    .to([slice1, slice2, slice3], { backgroundColor: "black", delay: 1.3, duration: 0.5, ease: "linear" }, "start");

  return tl;
};
