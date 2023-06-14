export type SelectProps = {
  name: string;
  label: string;
  options: { name: string; code: string }[];
  selectClick?: (state: boolean, code: string, text: string, fieldName: string) => void;
};

export type ArrowProps = {
  className: string;
};

export enum SelectTypes {
  Clear = "C",
}
