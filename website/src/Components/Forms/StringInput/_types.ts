import { UseFormRegister } from "react-hook-form";

export type StringInputProps = {
  register: UseFormRegister<any>;
  errorText?: string;
  isError: boolean;
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
  requiredStar?: boolean;
  defaultValue?: string;
};
