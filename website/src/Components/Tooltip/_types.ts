import { Props } from "@lukasbriza/lbui-lib";

export type TooltipProps = {
  children: React.ReactElement;
  text: string;
  show?: boolean;
  position?: "left" | "top" | "right" | "bottom";
} & Props<HTMLDivElement>;
