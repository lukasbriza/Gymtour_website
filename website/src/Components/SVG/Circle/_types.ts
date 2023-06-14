import { Props } from "@lukasbriza/lbui-lib";

export type CircleProps = {
  size: number;
  strokeWidth: number;
  stroke: string;
  fill?: string;
} & Props<SVGSVGElement>;
