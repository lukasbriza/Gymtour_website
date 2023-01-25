import { ReactLazyPreload } from "../utils/ReactLazyPreload";

///////////////////////////////////////////////////////////////////
//CODE SPLIT ON ROUTES//
const Home = ReactLazyPreload(() => import("../pages/Home"));
const Crossroad = ReactLazyPreload(() => import("../pages/Crossroad"));
const Fitness = ReactLazyPreload(() => import("../pages/Fitness"));
const Coach = ReactLazyPreload(() => import("../pages/Coach"));
const NotFound = ReactLazyPreload(() => import("../pages/NotFound"));
const About = ReactLazyPreload(() => import("../pages/About"));
const CoOp = ReactLazyPreload(() => import("../pages/CoOp"));
const Contact = ReactLazyPreload(() => import("../pages/Contact"));
const BusinessConditions = ReactLazyPreload(() => import("../pages/BusinessConditions"));
const DataProcessing = ReactLazyPreload(() => import("../pages/DataProcessing"));

const Login = ReactLazyPreload(() => import("../pages/Login"));
const Dashboard = ReactLazyPreload(() => import("../pages/Dashboard"));
const EmailUpdate = ReactLazyPreload(() => import("../pages/EmailUpdate"));

export const breakpoints = {
  mobile: 360,
  tablet: 760,
  pc: 980,
  wide: 1300,
} as const;

export const routes = {
  mainPage: { name: "Hlavní stránka", path: "/", component: Home },
  crossroad: { name: "Rozcestí", path: "/crossroad", component: Crossroad },
  fitness: { name: "Fitness", path: "/fitness", component: Fitness },
  coach: { name: "Trenéři", path: "/coach", component: Coach },
  aboutUs: { name: "O nás", path: "/about", component: About },
  coOp: { name: "Spolupráce", path: "/coop", component: CoOp },
  contact: { name: "Kontakt", path: "/contact", component: Contact },
  login: { name: "Login", path: "/login", component: Login },
  dashboard: { name: "Účet", path: "/dashboard", component: Dashboard },
  businessConditions: {
    name: "Obchodní podmínky",
    path: "/businessconditions",
    component: BusinessConditions,
  },
  dataProcessing: {
    name: "Zpracování údajů",
    path: "/dataprocessing",
    component: DataProcessing,
  },
  emailUpdate: {
    name: "Email update",
    path: "/emailUpdate",
    component: EmailUpdate,
  },
  notFound: { name: "404", path: "*", component: NotFound },
} as const;

export const menuItems = {
  mainPage: { name: routes.mainPage.name, path: routes.mainPage.path, component: routes.mainPage.component },
  aboutUs: { name: routes.aboutUs.name, path: routes.aboutUs.path, component: routes.aboutUs.component },
  coOp: { name: routes.coOp.name, path: routes.coOp.path, component: routes.coOp.component },
  contact: { name: routes.contact.name, path: routes.contact.path, component: routes.contact.component },
} as const;

export const footerLinks = {
  footerLinks1: [
    { name: routes.businessConditions.name, path: routes.businessConditions.path },
    { name: routes.dataProcessing.name, path: routes.dataProcessing.path },
  ],
  footerLinks2: [
    { name: routes.mainPage.name, path: routes.mainPage.path },
    { name: routes.coOp.name, path: routes.coOp.path },
    { name: routes.aboutUs.name, path: routes.aboutUs.path },
    { name: routes.coach.name, path: routes.coach.path },
    { name: routes.fitness.name, path: routes.fitness.path },
  ],
} as const;

export const transitionSetup = {
  transitionTimeout: 500,
} as const;
///////////////////
/*
const animationStore = {
  menu: {
    logo: {
      logoIn: () => {
        gsap.effects.fadeIn(".logoPath", { stagger: 0 });
      },
      logoTextIn: () => {
        let logoText = gsap.utils.toArray(".logoText");
        logoText.reverse();
        gsap.effects.fadeIn(logoText, {
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
        });
      },
    },
    hamburger: {
      crossOn: (slices: any[]) => {
        gsap.effects.crossOn(slices[0], slices[1], slices[2]);
      },
      crossOff: (slices: any[]) => {
        gsap.effects.crossOff(slices[0], slices[1], slices[2]);
      },
      show: (wrapper: any) => {
        gsap.effects.fadeIn(wrapper, {
          displayInitial: "none",
          displayAfter: "grid",
          displayDuration: 0.5,
        });
      },
      hide: (wrapper: any) => {
        gsap.effects.fadeOffto(wrapper, {
          displayInitial: "grid",
          displayAfter: "none",
          displayDuration: 0.5,
        });
      },
    },
    menuOffer: {
      show: () => {
        gsap.effects.fadeIn(".offerItem", {
          displayInitial: "grid",
          displayAfter: "grid",
        });
      },
      hide: () => {
        console.log("offer hide");
      },
    },
    layer: {
      show: (layer: any) => {
        let tl = gsap.timeline();
        tl.layerOn(layer).fadeIn(".offerItem-layer", {
          displayInitial: "none",
          displayAfter: "grid",
          delay: 1,
        });
      },
      hide: (layer: any) => {
        let tl = gsap.timeline();
        tl.fadeOff(".offerItem-layer", {
          displayInitial: "grid",
          displayAfter: "none",
          duration: 0.5,
        }).layerOff(layer, { delay: 1 });
      },
    },
    show: (target: any) => {
      let tl = gsap.timeline();
      tl.fadeInto(target, { displayAfter: "grid" });
      return tl;
    },
    hide: (target: any) => {
      let tl = gsap.timeline();
      tl.fadeOffto(target, { displayAfter: "none" });
      return tl;
    },
  },
  home: {
    logo: {
      show: (
        bigLogoWrapper: any,
        logoPath: any,
        textArray: any,
        showLogoCallback: (arg0: boolean) => void,
        bigLogoPlayedCallback: (arg0: boolean) => void
      ) => {
        let tl = gsap.timeline();
        tl.addLabel("fill", 2)
          .displayPrepare(bigLogoWrapper, { from: "none", to: "flex" })
          .stroke(logoPath, {})
          .fill(logoPath, { duration: 1.5 }, "fill")
          .fadeIn(textArray, { delay: 2, duration: 1 });
        tl.then(() => gsap.effects.fadeOff(bigLogoWrapper, { delay: 0.5, duration: 0.7 })).then(() => {
          setTimeout(() => {
            showLogoCallback(false);
            bigLogoPlayedCallback(true);
          }, 2000);
        });
      },
    },
    mainHeader: {
      show: () => {
        let homeheader = gsap.utils.toArray(".homeHeader");
        let tl = gsap.timeline();
        tl.fadeIn(homeheader, {
          stagger: 0.3,
          delay: 0.5,
          duration: 1,
        })
          .fadeIn("#pageHeader", {
            delay: 1.5,
            duration: 1,
            displayAfter: "flex",
          })
          .fadeIn("#homeButton", { delay: 1.5, duration: 1 });
      },
    },
  },
  crossroad: {
    modal: {
      show: (modal: any) => {
        let tl = gsap.timeline();
        tl.fadeIn(modal, {
          stagger: 0,
          delay: 0,
          displayInitial: "none",
          displayAfter: "grid",
          duration: 0.5,
        });
        return tl;
      },
      hide: (modal: any) => {
        let tl = gsap.timeline();
        tl.fadeOff(modal, {
          delay: 0,
          stagger: 0,
          duration: 0.3,
          displayInitial: "grid",
          displayAfter: "none",
        });
        return tl;
      },
      infiniteRotation: (circle: any) => {
        let tl = gsap.timeline();
        tl.infiniteRotation(circle, {
          startRotation: 0,
          endRotation: 360,
          duration: 0.5,
        });
        return tl;
      },
      loadingCompleteError: (circle: gsap.TweenTarget, colorStart: any, colorEnd: any, callback: () => void) => {
        gsap.getTweensOf(circle).map((tween) => {
          return tween.repeat(2);
        });
        let tl = gsap.timeline();
        tl.loadingComplete(circle, {
          colorStart: colorStart,
          colorEnd: colorEnd,
          borderWidth: "5px",
          duration: 0.5,
          delay: 1.25,
        })
          .addLabel("crossStart")
          .to(
            "#Line_1",
            {
              strokeDashoffset: 0,
              duration: 1,
              delay: -0.5,
              ease: Power3.easeOut,
              onComplete: () => {
                callback();
              },
            },
            "crossStart"
          )
          .to(
            "#Line_2",
            {
              strokeDashoffset: 0,
              duration: 1,
              delay: -0.25,
              ease: Power3.easeOut,
            },
            "crossStart"
          );
      },
      loadingCompleteSucess: (
        circle: gsap.TweenTarget,
        colorStart: any,
        colorEnd: any,
        sucess: any,
        callback: () => void
      ) => {
        gsap.getTweensOf(circle).map((tween) => {
          return tween.repeat(3);
        });
        let tl = gsap.timeline();
        tl.loadingComplete(circle, {
          colorStart: colorStart,
          colorEnd: colorEnd,
          borderWidth: "5px",
          duration: 0.5,
          delay: 1.25,
        })
          .addLabel("sucessStart")
          .to(sucess, {
            strokeDashoffset: 0,
            duration: 1,
            ease: Power3.easeOut,
          })
          .then(() => {
            callback();
          });
      },
      showMsgBtn: (messageSection: { children: any }, button: any) => {
        let tl = gsap.timeline();
        tl.fadeIn(messageSection.children, {
          stagger: 0.3,
          duration: 0.5,
          displayInitial: "initial",
          displayAfter: "initial",
        }).fadeIn(button, {
          duration: 0.5,
          delay: 0.25,
          displayInitial: "initial",
          displayAfter: "initial",
        });
      },
    },
  },
  fitness: {
    filter: {
      show: (wrapper: gsap.TweenTarget) => {
        let tl = gsap.timeline();
        tl.to(wrapper, { opacity: 1, display: "initial" }, 0)
          .addLabel("start")
          .filterOn(
            wrapper,
            {
              widthFrom: "0%",
              widthTo: "100%",
              widthDuration: 4,
            },
            "start"
          )
          .to(
            wrapper,
            {
              paddingLeft: "15px",
              duration: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .fadeIn(".filterSection", {
            displayInitial: "none",
            displayAfter: "block",
            stagger: 0.1,
            duration: 0.3,
          })
          .fadeIn(".contentFilterButton", {
            displayInitial: "none",
            displayAfter: "block",
            duration: 0.3,
            delay: 0.8,
          });
        return tl;
      },
      hide: (wrapper: any) => {
        let arr = gsap.utils.toArray(".filterSection");
        arr = arr.reverse();
        let tl = gsap.timeline();
        tl.fadeOff(".contentFilterButton", {
          displayInitial: "block",
          displayAfter: "none",
          duration: 0.3,
        })
          .fadeOff(arr, {
            displayInitial: "block",
            displayAfter: "none",
            stagger: 0.1,
            duration: 0.3,
          })
          .addLabel("start")
          .to(
            wrapper,
            {
              paddingLeft: "0px",
              duration: 1,
              delay: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .filterOff(
            wrapper,
            {
              delay: 1,
              widthFrom: "100%",
              widthTo: "0%",
              widthDuration: 1.5,
            },
            "start"
          )
          .to(wrapper, { opacity: 0, display: "none", delay: 0.5 });
        return tl;
      },
      arrowUp: (arrow: gsap.TweenTarget, typesWrapper: gsap.TweenTarget, containerHeight: string) => {
        let tl = gsap.timeline();
        tl.to(typesWrapper, {
          height: containerHeight + "px",
          duration: 0.0025,
          ease: "none",
        })
          .addLabel("start")
          .to(
            arrow,
            {
              transform: "rotate(-179deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "start"
          )
          .fadeOff(
            typesWrapper,
            {
              displayInitial: "flex",
              displayAfter: "flex",
              stagger: 0,
              duration: 0.25,
              delay: 0,
            },
            "start"
          )
          .to(
            typesWrapper,
            {
              height: 0 + "px",
              ease: Power2.easeOut,
              duration: 0.2,
              delay: 0.7,
            },
            "start"
          )
          .to(typesWrapper, {
            display: "none",
            duration: 0.0025,
            ease: "none",
          });
      },
      arrowDown: (arrow: gsap.TweenTarget, typesWrapper: gsap.TweenTarget, containerHeight: string) => {
        let tl = gsap.timeline();
        tl.addLabel("arrow")
          .to(
            typesWrapper,
            {
              height: containerHeight + "px",
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "arrow"
          )
          .to(
            arrow,
            {
              transform: "rotate(0deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "arrow"
          )
          .addLabel("start")
          .fadeIn(
            typesWrapper,
            {
              displayInitial: "none",
              displayAfter: "flex",
              stagger: 0,
              duration: 1,
              delay: 0,
            },
            "start"
          );
      },
    },
    card: {
      init: (elements: any) => {
        let tl = gsap.timeline();
        tl.fadeIn(elements, {
          displayInitial: "block",
          displayAfter: "block",
          stagger: 0.2,
          duration: 0.5,
        });
        return tl;
      },
    },
  },
  coach: {
    filter: {
      show: (wrapper: gsap.TweenTarget) => {
        let tl = gsap.timeline();
        tl.to(wrapper, { opacity: 1, display: "initial" }, 0)
          .addLabel("start")
          .filterOn(
            wrapper,
            {
              widthFrom: "0%",
              widthTo: "100%",
              widthDuration: 4,
            },
            "start"
          )
          .to(
            wrapper,
            {
              paddingLeft: "15px",
              duration: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .fadeIn(".filterSection", {
            displayInitial: "none",
            displayAfter: "block",
            stagger: 0.1,
            duration: 0.3,
          })
          .fadeIn(".contentFilterButton", {
            displayInitial: "none",
            displayAfter: "block",
            duration: 0.3,
            delay: 0.8,
          });
        return tl;
      },
      hide: (wrapper: any) => {
        let arr = gsap.utils.toArray(".filterSection");
        arr = arr.reverse();
        let tl = gsap.timeline();
        tl.fadeOff(".contentFilterButton", {
          displayInitial: "block",
          displayAfter: "none",
          duration: 0.3,
        })
          .fadeOff(arr, {
            displayInitial: "block",
            displayAfter: "none",
            stagger: 0.1,
            duration: 0.3,
          })
          .addLabel("start")
          .to(
            wrapper,
            {
              paddingLeft: "0px",
              duration: 1,
              delay: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .filterOff(
            wrapper,
            {
              delay: 1,
              widthFrom: "100%",
              widthTo: "0%",
              widthDuration: 1.5,
            },
            "start"
          )
          .to(wrapper, { opacity: 0, display: "none", delay: 0.5 });
        return tl;
      },
      arrowUp: (arrow: gsap.TweenTarget, typesWrapper: gsap.TweenTarget, containerHeight: string) => {
        let tl = gsap.timeline();
        tl.to(typesWrapper, {
          height: containerHeight + "px",
          duration: 0.0025,
          ease: "none",
        })
          .addLabel("start")
          .to(
            arrow,
            {
              transform: "rotate(-179deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "start"
          )
          .fadeOff(
            typesWrapper,
            {
              displayInitial: "flex",
              displayAfter: "flex",
              stagger: 0,
              duration: 0.25,
              delay: 0,
            },
            "start"
          )
          .to(
            typesWrapper,
            {
              height: 0 + "px",
              ease: Power2.easeOut,
              duration: 0.2,
              delay: 0.7,
            },
            "start"
          )
          .to(typesWrapper, {
            display: "none",
            duration: 0.0025,
            ease: "none",
          });
      },
      arrowDown: (arrow: gsap.TweenTarget, typesWrapper: gsap.TweenTarget, containerHeight: string) => {
        let tl = gsap.timeline();
        tl.addLabel("arrow")
          .to(
            typesWrapper,
            {
              height: containerHeight + "px",
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "arrow"
          )
          .to(
            arrow,
            {
              transform: "rotate(0deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "arrow"
          )
          .addLabel("start")
          .fadeIn(
            typesWrapper,
            {
              displayInitial: "none",
              displayAfter: "flex",
              stagger: 0,
              duration: 1,
              delay: 0,
            },
            "start"
          );
      },
    },
    card: {
      init: (elements: any) => {
        let tl = gsap.timeline();
        tl.fadeIn(elements, {
          displayInitial: "block",
          displayAfter: "block",
          stagger: 0.2,
          duration: 0.5,
        });
        return tl;
      },
    },
  },
  dashboard: {
    sidebarHamburger: {
      crossOn: async (slices: any[]) => {
        const tl = gsap.timeline();
        tl.then(gsap.effects.crossOn(slices[0], slices[1], slices[2]));
        return tl;
      },
      crossOff: (slices: any[]) => {
        const tl = gsap.timeline();
        tl.then(gsap.effects.crossOff(slices[0], slices[1], slices[2]));
        return tl;
      },
    },
    menuShift: {
      on: async (menu: gsap.TweenTarget, hmbBackground: gsap.TweenTarget, slices: gsap.TweenTarget, items: any) => {
        const tl = gsap.timeline();
        tl.addLabel("start")
          .to(
            menu,
            {
              width: "100%",
              duration: 2,
              ease: Power3.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              backgroundColor: "transparent",
              duration: 0.5,
              ease: "linear",
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              right: "10px",
              duration: 0.5,
              ease: Power3.easeOut,
            },
            "start"
          )
          .to(
            slices,
            {
              backgroundColor: "white",
              duration: 0.5,
              ease: "linear",
            },
            "start"
          )
          .fadeIn(items, { delay: 0.75, displayAfter: "initial" });
        return tl;
      },
      off: async (menu: any, hmbBackground: any, slices: any, items: any) => {
        const fadeoddDelay = 1;
        const tl = gsap.timeline();
        tl.fadeOff(items, { delay: 0, displayAfter: "none", stagger: 0.1 })
          .addLabel("start")
          .to(
            menu,
            {
              width: "0%",
              duration: 2,
              delay: fadeoddDelay,
              ease: Power2.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              backgroundColor: "white",
              delay: fadeoddDelay + 0.5,
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              right: "-70px",
              duration: 1,
              delay: fadeoddDelay + 0.3,
              ease: "linear",
            },
            "start"
          )
          .to(
            slices,
            {
              backgroundColor: "black",
              delay: 0.3 + fadeoddDelay,
              duration: 0.5,
              ease: "linear",
            },
            "start"
          );
        return tl;
      },
    },
  },
  emailUpdate: {
    content: {
      show: (target: any) => {
        const tl = gsap.timeline();
        tl.fadeIn(target, {
          displayInitial: "none",
          displayAfter: "flex",
          stagger: 0,
        });
      },
    },
  },
};*/
