import { Props } from "@lukasbriza/lbui-lib";

export type CrossProps = {
  scale: number;
  stroke: string;
  strokeWidth: number;
} & Props<SVGSVGElement>;
