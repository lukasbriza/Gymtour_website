import { useEffect, useState, useRef, FC } from "react";
import { Link } from "react-router-dom";
import { SmallLogo } from "../SVG/SmallLogo";
import { SmallText } from "../SVG/SmallText";
import { LoginButton } from "../SVG/LoginButton"
import { text } from '../../config/textSource'
import { useAppContext } from "@hooks";
import clsx from "clsx";
import { routes, breakpoints, menuItems } from "@config";
import { crossOff, crossOn, hideHamburger, hideLayer, hideMenu, hideMenuOffer, showHamburger, showLayer, showMenu, showMenuOffer } from "@animations";
import { HamburgerProps, MenuLayerProps, MenuOfferProps } from "./_types";



export const Menu: FC = () => {
  const [showMenuComp, setShowMenuComp] = useState<boolean>(true)
  const [background, setBackground] = useState<undefined | "transparent">(undefined);
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [showOffer, setShowOffer] = useState<boolean | undefined>();
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  const { width = 0, actualLocation } = useAppContext();

  let logoScale: number = 0.1;
  let textScale: number = 0.15;

  const routesArray = Object.values(menuItems);
  const menuRef = useRef<HTMLElement>(null)
  const isMainPage = actualLocation === "/"
  const biggerThanTablet = width > breakpoints.tablet
  const smallerOrEqualThenTablet = width <= breakpoints.tablet
  const isDashboard = actualLocation?.startsWith(routes.dashboard.path)

  const handleIsActive = () => setHamburger(!hamburger);
  //MENU BACKGROUND//
  useEffect(() => {
    setBackground(isMainPage ? "transparent" : undefined)
  }, [isMainPage]);

  //DISPLAY MENU AND HAMBURGER LOGIC//
  useEffect(() => {
    if (!isMainPage && biggerThanTablet) {
      setShowOffer(true);
      setShowHamburger(false);
      setHamburger(false);
    }
    if (!isMainPage && smallerOrEqualThenTablet) {
      setShowOffer(false);
      setShowHamburger(true);
    }
    if (isMainPage) {
      setHamburger(false);
      setShowHamburger(false);
      setShowOffer(false);
    }
  }, [biggerThanTablet, isMainPage, smallerOrEqualThenTablet]);

  //SHOW MENU LOGIC//
  useEffect(() => {
    const { current } = menuRef
    if (!isDashboard && !showMenuComp) {
      setShowMenuComp(true)
      current && showMenu(current)
      return
    }
    if (isDashboard && showMenuComp) {
      setShowMenuComp(false)
      current && hideMenu(current)
      return
    }
  }, [isDashboard, showMenuComp])

  if (width && width <= breakpoints.tablet) {
    return (
      <nav
        id="menu-mob"
        className={clsx(["absolute", "topZ", "menu"])}
        style={{ backgroundColor: background, background: background }}
        ref={menuRef}
      >
        <Link className={clsx(["logo-wrapper", "logoGrid"])} to={routes.mainPage.path}>
          <SmallLogo scale={logoScale} className={clsx(["relative", "centerY"])} />
          <SmallText scale={textScale} className={clsx(["relative", "centerY"])} />
        </Link>
        <Hamburger
          className={clsx(["hamburgerGrid", "gridRightX", "gridCenterY",])}
          isActive={handleIsActive}
          show={showHamburger}
          hamburger={hamburger}
        />
        <MenuLayer offer={routesArray} show={hamburger} />
      </nav>
    );
  } else {
    return (
      <nav
        id="menu-pc"
        className={clsx(["absolute", "topZ", "menu"])}
        style={{ backgroundColor: background, background: background }}
        ref={menuRef}
      >
        <Link
          className={clsx(["logo-wrapper", "logoGrid"])}
          to={routes.mainPage.path}
        >
          <SmallLogo scale={logoScale} className={clsx(["relative", "centerY"])} />
          <SmallText scale={textScale} className={clsx(["relative", "centerY"])} />
        </Link>
        <MenuOffer
          className={clsx(["menuOfferGrid"])}
          offer={routesArray}
          show={showOffer}
        />
      </nav>
    );
  }
};


const MenuOffer: FC<MenuOfferProps> = (props) => {
  const { show, className, offer } = props
  const menuOffer: any = useRef();

  useEffect(() => {
    show ? showMenuOffer() : hideMenuOffer()
  }, [show]);

  const menuItems = offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <Link to={obj.path} className={clsx(["stretchX", "relative", "offerItem"])} key={index}>{obj.name}</Link>
      );
    }
  );

  return (
    <div
      id="menuOffer"
      className={className}
      ref={menuOffer}
    >
      {menuItems}
      <Link to={routes.login.path} className={clsx(["stretchX", "relative", "offerItem", "loginButton"])}>
        <LoginButton />
        <span className="tooltip">{text.menuTooltip.cz}</span>
      </Link>
    </div>
  );
};

const MenuLayer: FC<MenuLayerProps> = (props) => {
  const { show } = props
  const menuLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = menuLayer
    if (current) {
      show ? showLayer(current) : hideLayer(current)
    }
  }, [show]);

  let menuItems = props.offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <Link to={obj.path} className={clsx(["relative", "offerItem", "offerItem-layer"])} key={index}>
          <p>{obj.name}</p>
        </Link>
      );
    }
  );

  return (
    <div id="menuLayer" className={clsx(["stretchVH", "absolute", "top", "right", "mainColor"])} ref={menuLayer}>
      <section id="menuOfferItems-wrapper">
        {menuItems}
        <Link to={routes.login.path} className={clsx(["relative", "offerItem", "offerItem-layer", "loginButton"])}>
          <LoginButton />
          <span className="tooltip">Účet</span>
        </Link>
      </section>
    </div>
  );
};

const Hamburger: FC<HamburgerProps> = (props) => {
  const { hamburger, show } = props
  const slice1 = useRef<HTMLDivElement>(null)
  const slice2 = useRef<HTMLDivElement>(null)
  const slice3 = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (slice1.current && slice2.current && slice3.current) {
      hamburger ?
        crossOn(slice1.current, slice2.current, slice3.current) :
        crossOff(slice1.current, slice2.current, slice3.current)
    }
  }, [hamburger])

  useEffect(() => {
    const { current } = wrapperRef
    if (current) {
      show ? showHamburger(current) : hideHamburger(current)
    }
  }, [show])

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
