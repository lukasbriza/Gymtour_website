import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import { LoadingProps } from "./_types";
import { startLoading } from "@animations";

export const Loading: FC<LoadingProps> = (props) => {
  const { className, scale, height } = props;
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const line4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //START ANIMATION
    if (line1.current && line2.current && line3.current && line4.current) {
      startLoading(
        [line1.current, line2.current, line3.current, line4.current],
        { height: height }
      );
    }
  }, [height]);

  return (
    <div
      className={clsx(["loadingWrapper", className])}
      style={{
        scale: scale ? scale : 1,
        height: (height ? height : 15) * (scale ? scale : 1) + "px",
      }}
    >
      <div ref={line1} className={"loadingLine"}></div>
      <div ref={line2} className={"loadingLine"}></div>
      <div ref={line3} className={"loadingLine"}></div>
      <div ref={line4} className={"loadingLine"}></div>
    </div>
  );
};
