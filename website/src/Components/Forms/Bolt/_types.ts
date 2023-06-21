import { FilterVariants } from "src/components/_index";

export type BoltProps = {
  text: string;
  name?: string;
  code?: string;
  type?: FilterVariants;
  fieldName?: string;
  id?: string;
};
