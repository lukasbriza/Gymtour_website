import { Control } from "react-hook-form";

export type StringInputProps = {
  errorText?: string;
  isError: boolean;
  control: Control<any, any>;
  inputClass?: string;
  labelClass?: string;
  labelFilleClass?: string;
  labelFocusClass?: string;
  className?: string;
  helperClass?: string;
  name: string;
  label: string;
  show?: boolean;
  helperText?: string;
  password?: boolean;
  autoComplete?: "on" | "off";
};
