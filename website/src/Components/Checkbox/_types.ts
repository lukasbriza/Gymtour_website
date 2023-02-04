import { Control } from "react-hook-form";

export type CheckboxProps = {
  className?: string;
  helperClass?: string;
  helperText?: string;
  errorText?: string;
  show?: boolean;
  isError: boolean;
  control: Control<any, any>;
  name: string;
  label: string;
};
