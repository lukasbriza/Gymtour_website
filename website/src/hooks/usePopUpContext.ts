import { usePopUpService } from "@lukasbriza/lbui-lib";
import clsx from "clsx";

export type PopUpProps = {
  header: string;
  text: string;
  className?: string;
};

export const usePopUpContext = () => {
  const { success: sucessInt, error: errorInt, info: infoInt, warning: warningInt } = usePopUpService();
  const success = (props: PopUpProps) => {
    const { className, ...otherProps } = props;
    sucessInt({
      enterDirection: "up",
      leaveDirection: "up",
      className: clsx(["popupBase", className]),
      ...otherProps,
    });
  };
  const error = (props: PopUpProps) => {
    const { className, ...otherProps } = props;
    errorInt({
      enterDirection: "up",
      leaveDirection: "up",
      className: clsx(["popupBase", className]),
      timeoutOption: { enable: false },
      ...otherProps,
    });
  };
  const info = (props: PopUpProps) => {
    const { className, ...otherProps } = props;
    infoInt({
      enterDirection: "up",
      leaveDirection: "up",
      className: clsx(["popupBase", className]),
      ...otherProps,
    });
  };
  const warning = (props: PopUpProps) => {
    const { className, ...otherProps } = props;
    warningInt({
      enterDirection: "up",
      leaveDirection: "up",
      className: clsx(["popupBase", className]),
      ...otherProps,
    });
  };
  return { success, error, info, warning };
};
