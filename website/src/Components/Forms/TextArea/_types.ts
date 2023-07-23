import { Props } from "@lukasbriza/lbui-lib";

export type TextAreaProps = {
  name: string;
  requiredStar?: boolean;
  cols?: number;
  rows?: number;
  helperClass?: string;
  helperRootClass?: string;
  className?: string;
  helperText?: string;
  errorText?: string;
  isError: boolean;
  show?: boolean;
  label: string;
  resize?: boolean;
} & Props<HTMLTextAreaElement>;
