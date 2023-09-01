import { Props } from "@lukasbriza/lbui-lib";

export type OverflowTextTooltipProps = {
  children: string;
  tooltipId: string;
  content: string;
} & Props<HTMLDivElement>;
