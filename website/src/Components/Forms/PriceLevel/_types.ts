import { Props } from "@lukasbriza/lbui-lib";

export type PriceLevelProps = {
  name: string;
  defaultNumber?: number;
  enableUndefined?: boolean;
} & Props<HTMLDivElement>;
