import { CustomErrorResponseObject } from "src/utils/_index";

export type UpdateViewsResponse = CustomErrorResponseObject<boolean>;
export type UpdateViews = { fitness?: string[]; coach?: string[] };
