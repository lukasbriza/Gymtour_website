import { hideMenu, showMenu } from "src/animations/_index";
import { ModalContext } from "@lukasbriza/lbui-lib";
import { ReactNode, useContext } from "react";
import { ModalButtonRow } from "src/components";

type ShowModalProps = {
  headerComp: ReactNode;
  text: string;
  button: string;
  onClick?: () => void;
  backButton?: boolean;
  backText?: string;
};

export const useModal = () => {
  const { show, close: closeModal, isActive } = useContext(ModalContext);
  const nav = document.getElementsByTagName("nav")[0];

  const showModal = (props: ShowModalProps) => {
    const { headerComp, text, button, onClick, backButton, backText } = props;
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
      buttonComponent:
        backButton && ModalButtonRow({ submitText: button, backText: backText, onBack: closeModal, onClick: onClick }),
      transition: true,
      closeOnOutsideClick: true,
      headerComponent: headerComp,
      styleClass: {
        root: "rootModalClass",
        modal: "modalClass",
        button: "buttonClass",
        text: "modalTextClass"
      }
    });
  };
  return { showModal, closeModal, isActive };
};
