import { SortOrder } from "mongoose";

export const orderQuery = (order?: number): { [key: string]: SortOrder } => {
  switch (order) {
    case 1:
      return { popularity: "desc" };
    case 2:
      return { name: "asc" };
    case 3:
      return { views: "desc" };
    default:
      return { popularity: "desc" };
  }
};
