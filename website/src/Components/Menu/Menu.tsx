import { useEffect, useState, useRef, FC } from "react";
import { Link } from "react-router-dom";
import { useAnimationContext, useAppContext } from "../../hooks"
import { menuItems, breakpoints, routes } from "../../config"
import { showMenu, hideMenu, showMenuOffer, hideMenuOffer, crossOn, showLayer, hideLayer, crossOff, showHamburger, hideHamburger } from "../../animations/_index"
import { SmallLogo, SmallText, LoginIcon } from "../../components/SVG/_index"
import { HamburgerProps, MenuLayerProps, MenuOfferProps } from "./_types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";



export const Menu: FC = () => {
  const [showMenuComp, setShowMenuComp] = useState<boolean>(true)
  const [background, setBackground] = useState<undefined | "transparent">(undefined);
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [showOffer, setShowOffer] = useState<boolean | undefined>();
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  const { width = 0, actualLocation } = useAppContext();
  const { } = useAnimationContext()

  let logoScale: number = 0.1;
  let textScale: number = 0.15;

  const routesArray = Object.values(menuItems);
  const menuRef = useRef<HTMLElement>(null)
  const isMainPage = actualLocation === "/"
  const biggerThanTablet = width > breakpoints.tablet
  const smallerOrEqualThenTablet = width <= breakpoints.tablet

  const handleIsActive = () => setHamburger(!hamburger);
  //MENU BACKGROUND//
  useEffect(() => {
    setBackground(isMainPage ? "transparent" : undefined)
  }, [isMainPage]);

  //DISPLAY MENU AND HAMBURGER LOGIC//
  useEffect(() => {
    if (!isMainPage) {
      if (biggerThanTablet) {
        setShowOffer(true);
        setShowHamburger(false);
        setHamburger(false);
      }
      if (smallerOrEqualThenTablet) {
        setShowOffer(false);
        setShowHamburger(true);
      }
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
    if (showMenuComp) {
      current && showMenu(current)
      return
    }
    if (!showMenuComp) {
      current && hideMenu(current)
      return
    }
  }, [showMenuComp])

  //ROUTE CHANGE MENULAYER SET OFF//
  useEffect(() => {
    if (hamburger) {
      setHamburger(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualLocation])

  return (
    <nav
      id={smallerOrEqualThenTablet ? "menu-mob" : "menu-pc"}
      className={clsx(["absolute", "menu"])}
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
      {
        smallerOrEqualThenTablet ?
          <>
            <Hamburger
              className={clsx(["hamburgerGrid", "gridRightX", "gridCenterY",])}
              isActive={handleIsActive}
              show={showHamburger}
              hamburger={hamburger}
            />
            <MenuLayer offer={routesArray} show={hamburger} />
          </> :
          <MenuOffer
            className={clsx(["menuOfferGrid"])}
            offer={routesArray}
            show={showOffer}
          />
      }
    </nav>
  );

};


const MenuOffer: FC<MenuOfferProps> = (props) => {
  const { t } = useTranslation()
  const { show, className, offer } = props
  const menuOffer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    show ? showMenuOffer() : hideMenuOffer()
  }, [show]);

  const menuItems = offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <Link to={obj.path} className={clsx(["stretchX", "relative", "offerItem"])} key={index}>{t(obj.name as any)}</Link>
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
        <LoginIcon />
      </Link>
    </div>
  );
};

const MenuLayer: FC<MenuLayerProps> = (props) => {
  const { t } = useTranslation()
  const { show } = props
  const menuLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = menuLayer
    if (current) {
      show ? showLayer(current) : hideLayer(current)
    }
  }, [show]);

  const menuItems = props.offer.map(
    (obj: { name: string; path: string; component: void }, index) => {
      return (
        <Link to={obj.path} className={clsx(["relative", "offerItem", "offerItem-layer"])} key={index}>
          <p>{t(obj.name as any)}</p>
        </Link>
      );
    }
  );

  return (
    <div id="menuLayer" className={clsx(["stretchVH", "absolute", "top", "right", "mainColor"])} ref={menuLayer}>
      <section id="menuOfferItems-wrapper">
        {menuItems}
        <Link to={routes.login.path} className={clsx(["relative", "offerItem", "offerItem-layer", "loginButton"])}>
          <LoginIcon />
        </Link>
      </section>
    </div>
  );
};

const Hamburger: FC<HamburgerProps> = (props) => {
  const { hamburger, show, isActive } = props
  const slice1 = useRef<HTMLDivElement>(null)
  const slice2 = useRef<HTMLDivElement>(null)
  const slice3 = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    hamburger ?
      crossOn(slice1.current, slice2.current, slice3.current) :
      crossOff(slice1.current, slice2.current, slice3.current)
  }, [hamburger])

  useEffect(() => {
    const { current } = wrapperRef
    show ? showHamburger(current) : hideHamburger(current)
  }, [show])

  return (
    <div
      id="hamburger-wrapper"
      className={props.className}
      ref={wrapperRef}
      onClick={isActive}
    >
      <div className={"slice minorColor1 stretchX"} ref={slice1}></div>
      <div className={"slice minorColor1 stretchX"} ref={slice2}></div>
      <div className={"slice minorColor1 stretchX"} ref={slice3}></div>
    </div>
  );
};
