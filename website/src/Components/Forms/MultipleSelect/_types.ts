export type RegionSelectProps = {
  name: string;
  label: string;
  options: {
    header: string;
    code: string;
    options: {
      name: string;
      code: string;
    }[];
  }[];
  checkboxClick?: (state: boolean, code: string, text: string, fieldName: string) => void;
  syncWithWatch?: boolean;
};

export type SelectProps = {
  name: string;
  label: string;
  options: { name: string; code: string }[];
  checkboxClick?: (state: boolean, code: string, text: string, fieldName: string) => void;
  syncWithWatch?: boolean;
};

export type ControlledSelectProps = RegionSelectProps;

export type ArrowProps = {
  className: string;
};
