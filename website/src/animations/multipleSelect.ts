import { gsap } from "gsap";
import { fadeIn } from "./effects";

export const selectRegionShowAnimation = (ref: HTMLDivElement) => {
  const tl = gsap.timeline();
  const sections = ref.lastChild?.childNodes;
  const callOrder: Element | ChildNode[] = [];
  sections?.forEach((section) => {
    section.childNodes.forEach((node) => {
      callOrder.push(node);
    });
  });

  tl.addLabel("start").add(fadeIn(callOrder, { stagger: 0.1 }), "start");

  return tl;
};

export const selectShowAnimation = (ref: HTMLDivElement) => {
  const tl = gsap.timeline();
  const checkboxes = ref.lastChild?.childNodes;

  checkboxes && tl.add(fadeIn(checkboxes, { stagger: 0.1 }));
};
