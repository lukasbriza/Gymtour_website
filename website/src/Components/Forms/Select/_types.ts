export type SelectProps = {
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
  requiredStar?: boolean;
  className?: string;
  helperClass?: string;
  helperText?: string;
  isError: boolean;
  errorText?: string;
};
