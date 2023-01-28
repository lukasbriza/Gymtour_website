import { gsap, Sine, Power2, Power3 } from "gsap";

////////////////////////////////////////////////////////////////////////////
//REGISTER ANIMATIONS//
////////////////////////////////////////////////////////////////////////////
//DISPLAYPREPARE//
/*gsap.registerEffect({
  name: "displayPrepare",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      { display: config.from },
      { display: config.to, duration: 0, ease: "none" }
    );
  },
  defaults: {
    from: "none",
    to: "initial",
  },
  extendTimeline: true,
});*/
//STROKE//
/*gsap.registerEffect({
  name: "stroke",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        strokeDasharray: config.strokeDasharrayInitial,
        strokeDashoffset: config.strokeDashoffsetInitial,
      },
      {
        strokeDashoffset: config.strokeDashoffset,
        ease: Sine.easeInOut,
        duration: config.duration,
      }
    );
  },
  defaults: {
    strokeDasharrayInitial: "250%",
    strokeDashoffsetInitial: "250%",
    strokeDashoffset: 0,
    duration: 3,
  },
  extendTimeline: true,
});*/
//FILL//
/*gsap.registerEffect({
  name: "fill",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        fill: "transparent",
      },
      {
        fill: config.fill,
        duration: config.duration,
        ease: Power2.easeInOut,
      }
    );
  },
  defaults: {
    fill: "white",
    duration: 1,
  },
  extendTimeline: true,
});*/
//FADE IN//
/*gsap.registerEffect({
  name: "fadeIn",
  effect: (targets, config) => {
    let animation = gsap
      .fromTo(
        targets,
        {
          display: config.displayInitial,
          opacity: 0,
        },
        {
          display: config.displayAfter,
          opacity: 0,
          duration: config.displayDuration,
          ease: "none",
        }
      )
      .then(() => {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            delay: config.delay,
            duration: config.duration,
            stagger: config.stagger,
            ease: Power3.easeIn,
          }
        );
      });
    return animation;
  },
  defaults: {
    displayInitial: "none",
    displayAfter: "initial",
    stagger: 0.2,
    duration: 0.5,
    displayDuration: 0.002,
    delay: 0,
  },
  extendTimeline: true,
});*/
//FADE OFF//
/*gsap.registerEffect({
  name: "fadeOff",
  effect: (targets, config) => {
    setTimeout(() => {
      let animation = gsap
        .fromTo(
          targets,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            delay: config.delay,
            duration: config.duration,
            stagger: config.stagger,
            ease: Power3.easeIn,
          }
        )
        .then(() => {
          gsap.fromTo(
            targets,
            {
              display: config.displayInitial,
            },
            {
              display: config.displayAfter,
              duration: 0.002,
              ease: "none",
            }
          );
        });
      return animation;
    }, config.delay * 1000);
  },
  defaults: {
    delay: 0,
    displayInitial: "initial",
    displayAfter: "none",
    fromOpacity: 1,
    stagger: 0,
    duration: 0.2,
  },
  extendTimeline: true,
});*/
gsap.registerEffect({
  name: "fadeOffto",
  effect: (targets, config) => {
    const effect = gsap
      .to(targets, {
        opacity: 0,
        delay: config.delay,
        stagger: config.stagger,
        duration: config.duration,
        ease: Power3.easeIn,
      })
      .then(() => {
        gsap.to(targets, {
          display: config.displayAfter,
          duration: 0.02,
          ease: "none",
        });
      });
    return effect;
  },
  defaults: {
    displayAfter: "none",
    stagger: 0,
    delay: 0,
    duration: 0.2,
  },
  extendTimeline: true,
});
gsap.registerEffect({
  name: "fadeInto",
  effect: (targets, config) => {
    const effect = gsap
      .to(targets, {
        opacity: 1,
        delay: config.delay,
        stagger: config.stagger,
        duration: config.duration,
        ease: Power3.easeIn,
      })
      .then(() => {
        gsap.to(targets, {
          display: config.displayAfter,
          duration: 0.02,
          ease: "none",
        });
      });
    return effect;
  },
  defaults: {
    displayAfter: "grid",
    stagger: 0,
    delay: 0,
    duration: 0.2,
  },
  extendTimeline: true,
});
/*//HAMBURGER CROSS ON//
gsap.registerEffect({
  name: "crossOn",
  effect: (slice1, slice2, slice3, config = {}) => {
    gsap.to(slice1, {
      transformOrigin: "left",
      transform: "rotate(45deg) translateY(-1px)",
      duration: 0.3,
      ease: "linear",
    });
    gsap.to(slice3, {
      transformOrigin: "left",
      transform: "rotate(-45deg) translateY(1px)",
      duration: 0.3,
      ease: "linear",
    });
    gsap.to(slice2, {
      height: "0px",
      opacity: 0,
      duration: 0.3,
      ease: "linear",
    });
  },
  extendTimeline: true,
});
//HAMBURGER CROSS OFF//
gsap.registerEffect({
  name: "crossOff",
  effect: (slice1, slice2, slice3, config) => {
    gsap.to(slice1, {
      transformOrigin: "left",
      transform: "rotate(0deg) translateY(0px)",
      duration: 0.3,
      ease: "linear",
    });
    gsap.to(slice3, {
      transformOrigin: "left",
      transform: "rotate(0deg) translateY(0px)",
      duration: 0.3,
      ease: "linear",
    });
    gsap.to(slice2, {
      height: "5px",
      opacity: 1,
      duration: 0.3,
      ease: "linear",
    });
  },
  extendTimeline: true,
});*/
//LAYER ON//
/*gsap.registerEffect({
  name: "layerOn",
  effect: (target, config) => {
    let animation = gsap.to(target, {
      width: "100%",
      duration: config.duration,
      ease: Power2.easeOut,
    });
    return animation;
  },
  defaults: {
    duration: 2,
  },
  extendTimeline: true,
});
//LAYER OFF//
gsap.registerEffect({
  name: "layerOff",
  effect: (target, config) => {
    let animation = gsap.to(target, {
      width: "0%",
      duration: config.duration,
      delay: config.delay,
      ease: Power2.easeOut,
    });
    return animation;
  },
  defaults: {
    duration: 2,
    delay: 0,
  },
  extendTimeline: true,
});*/

//CIRCLE LOADING ANIMATION COMPLETE CIRCLE//
gsap.registerEffect({
  name: "loadingComplete",
  effect: (target, config) => {
    let tl = gsap.timeline();
    tl.to(
      target,

      {
        borderTopColor: config.colorEnd,
        borderTopWidth: config.borderWidth,
        borderRightColor: config.colorEnd,
        borderRightWidth: config.borderWidth,
        borderBottomColor: config.colorEnd,
        borderBottomWidth: config.borderWidth,
        borderLeftColor: config.colorEnd,
        borderLeftWidth: config.borderWidth,

        delay: config.delay,
        duration: config.duration,
        ease: Power3.easeOut,
      }
    );
    return tl;
  },
  defaults: {
    colorStart: "rgb(38,62,105)",
    colorEnd: "red",
    borderWidth: "5px",
    duration: 2,
    delay: 1,
  },
  extendTimeline: true,
});

//CIRCLE INFINITE ROTATION//
/*gsap.registerEffect({
  name: "infiniteRotation",
  effect: (target, config) => {
    let animation = gsap.fromTo(
      target,
      {
        rotation: config.startRotation,
      },
      {
        rotation: config.endRotation,
        duration: config.duration,
        repeat: config.repeat,
        ease: "linear",
      }
    );
    return animation;
  },
  defaults: {
    startRotation: 0,
    endRotation: 360,
    duration: 2,
    repeat: -1,
  },
  extendTimeline: true,
});*/
//FILTER ON//
/*gsap.registerEffect({
  name: "filterOn",
  effect: (filterWrapper, config) => {
    let tl = gsap.timeline();
    tl.addLabel("start").fromTo(
      filterWrapper,
      {
        width: config.widthFrom,
      },
      {
        width: config.widthTo,
        duration: config.widthDuration,
        ease: Power2.easeOut,
      },
      "start"
    );
    return tl;
  },
  defaults: {
    widthFrom: "0%",
    widthTo: "100%",
    widthDuration: 1,
  },
  extendTimeline: true,
});*/

//FILTER OFF//
/*gsap.registerEffect({
  name: "filterOff",
  effect: (filterWrapper, config) => {
    let tl = gsap.timeline();
    tl.addLabel("start").fromTo(
      filterWrapper,
      {
        width: config.widthFrom,
      },
      {
        width: config.widthTo,
        duration: config.widthDuration,
        delay: config.delay,
        ease: Power2.easeOut,
      }
    );
  },
  defaults: {
    widthFrom: "100%",
    widthTo: "0%",
    widthDuration: 1,
    delay: 0,
  },
  extendTimeline: true,
});*/
