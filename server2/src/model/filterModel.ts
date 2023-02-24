import { model, Schema } from "mongoose";

const filterSchema = new Schema();
export const FilterModel = model("Filter", filterSchema, "filters");
