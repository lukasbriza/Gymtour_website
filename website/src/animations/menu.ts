import gsap, { Power2 } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const showMenu = (target: HTMLElement) => {
  const tl = gsap.timeline();
  tl.add(fadeIn(target, { displayAfter: "grid" }));

  return tl;
};

export const hideMenu = (target: HTMLElement) => {
  const tl = gsap.timeline();
  tl.add(fadeOff(target, { displayAfter: "none" }));

  return tl;
};

export const showMenuOffer = () => {
  const tl = gsap.timeline();
  tl.add(fadeIn(".offerItem", { displayInitial: "grid", displayAfter: "grid" }));

  return tl;
};

export const hideMenuOffer = () => {
  const tl = gsap.timeline();
  tl.add(fadeOff(".offerItem", { displayAfter: "none" }));

  return tl;
};

export const crossOn = (slice1: gsap.TweenTarget, slice2: gsap.TweenTarget, slice3: gsap.TweenTarget) => {
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
      { transformOrigin: "left", transform: "rotate(-45deg) translateY(1px)", duration: 0.3, ease: "linear" },
      "start"
    );

  return tl;
};

export const crossOff = (slice1: gsap.TweenTarget, slice2: gsap.TweenTarget, slice3: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
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

export const showHamburger = (wrapper: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.add(fadeIn(wrapper, { displayInitial: "grid", displayAfter: "grid" }));

  return tl;
};

export const hideHamburger = (wrapper: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.add(fadeOff(wrapper, { displayInitial: "grid", displayAfter: "none" }));

  return tl;
};

export const showLayer = (layer: HTMLDivElement) => {
  const tl = gsap.timeline();
  tl.to(layer, { width: "100%", duration: 1.2, ease: Power2.easeOut }).add(
    fadeIn(".offerItem-layer", { displayInitial: "grid", displayAfter: "grid", delay: 0 })
  );

  return tl;
};

export const hideLayer = (layer: HTMLDivElement) => {
  const tl = gsap.timeline();
  tl.add(fadeOff(".offerItem-layer", { displayInitial: "grid", displayAfter: "none", duration: 0.5 })).to(layer, {
    width: "0%",
    duration: 1.5,
    ease: Power2.easeOut,
    delay: 0.5,
  });

  return tl;
};
