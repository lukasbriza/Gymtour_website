import { Props } from "@lukasbriza/lbui-lib";

export type EditableTableDataProps = {
  children: string;
  name: string;
  editInputClass?: string;
} & Props<HTMLTableCellElement>;
