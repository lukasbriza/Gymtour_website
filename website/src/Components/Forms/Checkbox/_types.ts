import { UseFormRegister } from "react-hook-form";

export type CheckboxProps = {
  defaultValue?: boolean;
  register: UseFormRegister<any>;
  className?: string;
  helperClass?: string;
  helperText?: string;
  errorText?: string;
  show?: boolean;
  isError: boolean;
  name: string;
  label: string;
};
