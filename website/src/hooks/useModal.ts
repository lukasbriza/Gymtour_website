import { hideMenu, showMenu } from "src/animations/_index";
import { ModalContext } from "@lukasbriza/lbui-lib";
import { ReactNode, useContext } from "react";

export const useModal = () => {
  const { show, close: closeModal, isActive } = useContext(ModalContext);
  const nav = document.getElementsByTagName("nav")[0];
  const showModal = (headerComp: ReactNode, text: string, button: string, onClick?: () => void) => {
    hideMenu(nav);

    show({
      onClick: (e) => {
        showMenu(nav);
        onClick?.();
      },
      rounded: false,
      text: text,
      button: true,
      buttonText: button,
      transition: true,
      closeOnOutsideClick: true,
      headerComponent: headerComp,
      rootClass: "rootModalClass",
      modalClass: "modalClass",
      buttonClass: "buttonClass",
      textClass: "modalTextClass",
    });
  };
  return { showModal, closeModal, isActive };
};
