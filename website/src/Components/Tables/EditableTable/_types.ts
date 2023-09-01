import { DeepMap, DeepPartial } from "react-hook-form";

export type EditableTableProps<T> = {
  children: React.ReactNode;
  onDataChange?: (data: T, dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>) => void;
};
