import { CustomErrorResponseObject } from "src/utils";

export type GetImage = { id?: string };
export type GetImageResponse = CustomErrorResponseObject<null>;

export type PostImage = { image: File, key: "card" } |
{ image: File, key: "main" } | { image: File[], key: "others" }
