import { SVGProps } from "react";

export type ToppedProps = {
  topped: boolean;
  className?: string;
  width?: number;
  height?: number;
} & SVGProps<SVGSVGElement>;
