import { Props } from "@lukasbriza/lbui-lib";
import { UseFormRegister } from "react-hook-form";

export type TextAreaProps = {
  defaultValue?: string;
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
