import { Props } from "@lukasbriza/lbui-lib";

export type LayerProps = {
  children: React.ReactNode;
  classname?: string;
} & Props<HTMLDivElement>;
