import { Props } from "@lukasbriza/lbui-lib";

export type EditableTableRowProps = {
  className?: string;
  children: React.ReactNode;
  showOnHover?: boolean;
  onButtonClick?: () => void;
} & Props<HTMLTableRowElement>;
