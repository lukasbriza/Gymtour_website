import { FilterVariants } from "@components";

export type BoltProps = {
  text: string;
  name?: string;
  code?: string;
  type?: FilterVariants;
  fieldName?: string;
  remove?: (code: string, fieldName: string) => void;
};
