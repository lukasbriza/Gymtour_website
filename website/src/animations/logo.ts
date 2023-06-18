import { setState } from "src/app/_index";

import { gsap } from "gsap";
import { fadeIn, fadeOff, fill, stroke } from "./effects";

export const bigLogoAnimation = (
  bigLogoWrapper: gsap.TweenTarget,
  logoPath: gsap.TweenTarget,
  textArray: gsap.TweenTarget[],
  setShowLogo: setState<boolean>,
  setBigLogoPlayed: setState<boolean>
) => {
  const endLogic = () => {
    setShowLogo(true);
    setBigLogoPlayed(true);
  };

  const tl = gsap.timeline();
  tl.addLabel("fill", 2)
    .set(bigLogoWrapper, { display: "flex" })
    .add(stroke(logoPath))
    .add(fill(logoPath, { duration: 1.5 }), "fill")
    .add(fadeIn(textArray, { delay: 0, duration: 0.4, stagger: 0.2 }), "-=1")
    .add(fadeOff(bigLogoWrapper, { delay: 0.5, duration: 1, displayInitial: "flex", displayAfter: "none" }))
    .call(endLogic);

  return tl;
};

export const smallLogoShow = () => {
  const logoText = gsap.utils.toArray(".logoText").reverse();

  const tl = gsap.timeline();
  tl.add(fadeIn(".logoPath", { stagger: 0 })).add(fadeIn(logoText, { duration: 0.4, stagger: 0.1, delay: 0 }), "+=0.2");

  return tl;
};
