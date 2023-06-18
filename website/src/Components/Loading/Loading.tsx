import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import { LoadingProps } from "./_types";
import { startLoading } from "../../animations/_index"

const baseWidth = 16
const baseHeight = 15

export const Loading: FC<LoadingProps> = (props) => {
  const { className, scale, height } = props;
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const line4 = useRef<HTMLDivElement>(null);

  const heightCompute = (height ? height : baseHeight) * (scale ? scale : 1)
  const lineWidth = scale ? (scale * baseWidth) / 4 : baseWidth / 4

  useEffect(() => {
    //START ANIMATION
    if (line1.current && line2.current && line3.current && line4.current) {
      startLoading(
        [line1.current, line2.current, line3.current, line4.current],
        { height: heightCompute }
      );
    }
  }, [heightCompute]);

  return (
    <div
      className={clsx(["loadingWrapper", className])}
      style={{
        scale: scale ? scale : 1,
        height: heightCompute + "px",
        width: scale ? (scale * baseWidth) + "px" : "16px"
      }}
    >
      <div ref={line1} className={"loadingLine"} style={{ width: lineWidth + "px" }}></div>
      <div ref={line2} className={"loadingLine"} style={{ width: lineWidth + "px" }}></div>
      <div ref={line3} className={"loadingLine"} style={{ width: lineWidth + "px" }}></div>
      <div ref={line4} className={"loadingLine"} style={{ width: lineWidth + "px" }}></div>
    </div>
  );
};
