import { model, Schema } from "mongoose";
import { Filter } from "../types";

export const filterSchema = new Schema<Filter>();
export const FilterModel = model<Filter>("Filter", filterSchema, "filters");
