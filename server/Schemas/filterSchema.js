const mongoose = require("mongoose");
const { Schema } = mongoose;

const filterSchema = new Schema();
const FilterModel = mongoose.model("Filter", filterSchema, "filters");

module.exports = { filterSchema, FilterModel };
