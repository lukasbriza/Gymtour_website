import { useEffect, FC } from "react";
import { useAnimationContext, useAppContext } from "src/hooks";
import { smallLogoShow } from "src/animations/_index";
import clsx from "clsx";

const CoOp: FC = () => {
  const appContext = useAppContext();
  const anContext = useAnimationContext();

  //////////////////////////////////////////////////
  //ANIMATIONS//
  useEffect(() => {
    anContext?.fn.setBigLogoPlayed(true);
    smallLogoShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //////////////////////////////////////////////////
  //SETUP//
  return (
    <div
      id="CoOp"
      className={clsx(["relative", "stretch", "minorColor2", "page"])}
    ></div>
  );
};

export default CoOp;
