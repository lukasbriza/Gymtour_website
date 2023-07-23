import gsap, { Power1 } from "gsap";

export const hasLoaded = (line1: gsap.TweenTarget, line2: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .fromTo(
      line2,
      { transform: "translate(-50%, -50%) rotate(0deg)" },
      { transform: "translate(-50%, -50%) rotate(-90deg)", duration: 0.5, ease: Power1.easeOut },
      "start"
    )
    .addLabel("toCross")
    .to(line1, { transform: "translate(-50%, -50%) rotate(135deg)", duration: 0.5, ease: Power1.easeOut }, "toCross")
    .to(line2, { transform: "translate(-50%, -50%) rotate(-135deg)", duration: 0.5, ease: Power1.easeOut }, "toCross");

  return tl;
};

export const hasUnloaded = (line1: gsap.TweenTarget, line2: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .fromTo(
      line1,
      { transform: "translate(-50%, -50%) rotate(135deg)" },
      { transform: "translate(-50%, -50%) rotate(90deg)", duration: 0.5, ease: Power1.easeOut },
      "start"
    )
    .fromTo(
      line2,
      { transform: "translate(-50%, -50%) rotate(-135deg)" },
      { transform: "translate(-50%, -50%) rotate(-90deg)", duration: 0.5, ease: Power1.easeOut },
      "start"
    )
    .addLabel("toPlus")
    .to(line2, { transform: "translate(-50%, -50%) rotate(0deg)", duration: 0.5, ease: Power1.easeOut }, "toPlus");

  return tl;
};
