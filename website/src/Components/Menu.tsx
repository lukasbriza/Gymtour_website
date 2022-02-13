import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
//COMPONENTS//
import { SmallLogo } from "./SVG/SmallLogo";
import { SmallText } from "./SVG/SmallText";

//FUNCTUION//
import { classListMaker } from "../Functions/classListMaker";
//CONFIG//
import { config, animationStore } from "../config/mainConfiguration";
//CONTEXT//
import { AppContext } from "../App/Context";

///////////////////////////////////////////////////////////////////////////////////////
const Menu = () => {
  //////////////////////////////////////////////////
  //STATE//
  const [background, setBackground] = useState<undefined | "transparent">(
    undefined
  );
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [showOffer, setShowOffer] = useState<boolean | undefined>();
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  //const [smallLogoAnimationPlayed, setSmallLogoAnimationPlayed] = useState<boolean>(false)
  //////////////////////////////////////////////////
  //VARIABLES//
  const appContext: any = useContext(AppContext);

  let logoScale: number = 0.1;
  let textScale: number = 0.15;

  const logoWrapperClass = classListMaker(["logo-wrapper", "logoGrid"]);
  const smallLogoClass = classListMaker(["relative", "centerY"]);
  const smallTextClass = classListMaker(["relative", "centerY"]);
  const hamburgerClass = classListMaker([
    "hamburgerGrid",
    "gridRightX",
    "gridCenterY",
  ]);
  const menuOfferClass = classListMaker(["menuOfferGrid"]);

  const routesArray = Object.values(config.menuItems);
  //////////////////////////////////////////////////
  //MENU BACKGROUND//
  useEffect(() => {
    let actualLocation = appContext.actualLocation;
    if (actualLocation === "/" && background === undefined) {
      setBackground("transparent");
    }
    if (actualLocation !== "/" && background === "transparent") {
      setBackground(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.actualLocation]);
  //DISPLAY MENU AND HAMBURGER LOGIC//
  useEffect(() => {
    if (
      appContext.actualLocation !== "/" &&
      appContext.width > config.breakpoints.tablet
    ) {
      setShowOffer(true);
      setShowHamburger(false);
      setHamburger(false);
    }
    if (
      appContext.actualLocation !== "/" &&
      appContext.width <= config.breakpoints.tablet
    ) {
      setShowOffer(false);
      setShowHamburger(true);
    }
    if (appContext.actualLocation === "/") {
      setHamburger(false);
      setShowHamburger(false);
      setShowOffer(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.actualLocation, appContext.width]);
  //////////////////////////////////////////////////
  //MOBILE SETUP//
  if (appContext.width <= config.breakpoints.tablet) {
    const menuMobileClassList = classListMaker([
      "absolute",
      "topZ",
      "stretchX",
      "menu",
    ]);

    return (
      <nav
        id="menu-mob"
        className={menuMobileClassList}
        style={{ backgroundColor: background, background: background }}
      >
        <Link className={logoWrapperClass} to={config.routes.mainPage.path}>
          <SmallLogo scale={logoScale} className={smallLogoClass} />
          <SmallText scale={textScale} className={smallTextClass} />
        </Link>
        <Hamburger
          className={hamburgerClass}
          isActive={() => {
            setHamburger(!hamburger);
          }}
          show={showHamburger}
          hamburger={hamburger}
        />
        <MenuLayer offer={routesArray} show={hamburger} />
      </nav>
    );
    //////////////////////////////////////////////////
    //PC SETUP//
  } else {
    const menuPcClassList = classListMaker([
      "absolute",
      "topZ",
      "stretchX",
      "menu",
    ]);

    return (
      <nav
        id="menu-pc"
        className={menuPcClassList}
        style={{ backgroundColor: background, background: background }}
      >
        <Link className={logoWrapperClass} to={config.routes.mainPage.path}>
          <SmallLogo scale={logoScale} className={smallLogoClass} />
          <SmallText scale={textScale} className={smallTextClass} />
        </Link>
        <MenuOffer
          className={menuOfferClass}
          offer={routesArray}
          show={showOffer}
        />
      </nav>
    );
  }
};
///////////////////////////////////////////////////////////////////////////////////////
const MenuOffer = (props: MenuOffer) => {
  const [show, setShow] = useState("none");
  const menuItemsClass = classListMaker(["stretchX", "relative", "offerItem"]);
  const menuOffer: any = useRef();
  /////////////////////////////////////////
  //OFFER SHOW LOGIC//
  useEffect(() => {
    if (props.show === true) {
      setShow("grid");
      animationStore.menu.menuOffer.show();
    }
    if (props.show === false) {
      setShow("none");
    }
  }, [props.show]);
  /////////////////////////////////////////
  let menuItems = props.offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <div className={menuItemsClass} key={index}>
          <Link to={obj.path}>{obj.name}</Link>
        </div>
      );
    }
  );

  return (
    <div
      id="menuOffer"
      className={props.className}
      ref={menuOffer}
      style={{ display: show }}
    >
      {menuItems}
    </div>
  );
};

const MenuLayer = (props: MenuLayer) => {

  const menuItemsClass = classListMaker(["relative", "offerItem", "offerItem-layer"]);
  const menuLayerClass = classListMaker(["stretchVH", "absolute", "top", "right", "mainColor"]);

  const menuLayer: any = useRef();
  /////////////////////////////////////////
  //LAYER ANIMATION//
  useEffect(() => {
    if (props.show === true) { animationStore.menu.layer.show(menuLayer.current) }
    if (props.show === false) { animationStore.menu.layer.hide(menuLayer.current) }
  }, [props.show]);
  /////////////////////////////////////////
  let menuItems = props.offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <Link to={obj.path} className={menuItemsClass} key={index}>
          <p>{obj.name}</p>
        </Link>
      );
    }
  );
  return (
    <div id="menuLayer" className={menuLayerClass} ref={menuLayer}>
      <section id="menuOfferItems-wrapper">{menuItems}</section>
    </div>
  );
};

const Hamburger = (props: Hamburger) => {

  const slice1: any = useRef()
  const slice2: any = useRef()
  const slice3: any = useRef()
  const wrapperRef: any = useRef()

  /////////////////////////////////////////
  //CROSS ANIMATION//
  useEffect(() => {
    let slices = [slice1.current, slice2.current, slice3.current]
    if (props.hamburger === true) {
      animationStore.menu.hamburger.crossOn(slices)
    }
    if (props.hamburger === false) {
      animationStore.menu.hamburger.crossOff(slices)
    }
  }, [props.hamburger])
  //SHOW LOGIC//
  useEffect(() => {
    let wrapper = wrapperRef.current
    if (props.show === true) {
      animationStore.menu.hamburger.show(wrapper)
    }
    if (props.show === false) {
      animationStore.menu.hamburger.hide(wrapper)
    }
  }, [props.show])
  /////////////////////////////////////////
  return (
    <div
      id="hamburger-wrapper"
      className={props.className}
      ref={wrapperRef}
      onClick={() => {
        props.isActive()
      }}
    >
      <div className={"slice minorColor1 stretchX"} ref={slice1}></div>
      <div className={"slice minorColor1 stretchX"} ref={slice2}></div>
      <div className={"slice minorColor1 stretchX"} ref={slice3}></div>
    </div>
  );
};
///////////////////////////////////////////////////////////////////////////////////////
export { Menu };
