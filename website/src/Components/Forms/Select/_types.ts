import { UseFormRegister } from "react-hook-form";

export type SelectProps = {
  defaultValue?: { name: string; code: string };
  name: string;
  label: string;
  options: { name: string; code: string }[];
  selectClick?: (state: boolean, code: string, text: string, fieldName: string) => void;
  disabled?: boolean;
  disabledClass?: string;
};

export type ArrowProps = {
  className: string;
};

export enum SelectTypes {
  Clear = "C",
}

export type SelectWithHelperProps = SelectProps & {
  register: UseFormRegister<any>;
  requiredStar?: boolean;
  className?: string;
  helperClass?: string;
  helperText?: string;
  isError: boolean;
  errorText?: string;
};
