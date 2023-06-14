import { gsap, Power2 } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const showBoltCross = (
  line1: gsap.TweenTarget,
  line2: gsap.TweenTarget,
  wrapper: gsap.TweenTarget,
  bolt: gsap.TweenTarget
) => {
  const tl = gsap.timeline();
  //INITIAL STATE
  tl.set(wrapper, { width: "0px", height: "0px", opacity: 0, display: "initial" })
    .set(line1, { width: "3px", opacity: 0 })
    .set(line2, { width: "3px", opacity: 0 });

  tl.addLabel("start")
    .to(
      wrapper,
      { marginLeft: "10px", width: "10px", height: "10px", opacity: 1, ease: Power2.easeOut, duration: 0.5 },
      "start"
    )
    .to(bolt, { paddingRight: "10px", ease: Power2.easeOut, duration: 0.5 }, "start")
    .add(
      fadeIn([line1, line2], {
        displayInitial: "none",
        displayAfter: "initial",
        duration: 0.2,
        stagger: 0,
        delay: 0.3,
      }),
      "start"
    )
    .to([line1, line2], { width: "100%", duration: 0.3, ease: Power2.easeOut, stagger: 0, delay: 0.45 }, "start");
  return tl;
};

export const hideBoltCross = (
  line1: gsap.TweenTarget,
  line2: gsap.TweenTarget,
  wrapper: gsap.TweenTarget,
  bolt: gsap.TweenTarget
) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .add(
      fadeOff([line1, line2], { displayInitial: "initial", displayAfter: "none", stagger: 0, duration: 0.3 }),
      "start"
    )
    .to(
      wrapper,
      { width: "0px", height: "0px", marginLeft: "0px", duration: 0.3, delay: 0.2, ease: Power2.easeIn },
      "start"
    )
    .to(bolt, { paddingRight: "15px", delay: 0.2, duration: 0.3, ease: Power2.easeIn }, "start");
  return tl;
};

export const fadeInBolt = (bolt: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.add(fadeIn(bolt, { displayInitial: "flex", displayAfter: "flex", duration: 0.2, stagger: 0 }));
  return tl;
};

export const fadeOffBolt = (bolt: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.add(fadeOff(bolt, { displayInitial: "flex", displayAfter: "flex", duration: 0.2, stagger: 0 }));
  return tl;
};
