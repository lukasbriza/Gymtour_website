const mongoose = require("mongoose");
const { Schema } = mongoose;

let objectId = new mongoose.Types.ObjectId().toString();

const contactSchema = new Schema({
  tel: { type: Number, required: false, default: null },
  mobile: { type: Number, required: true, default: null },
  email: { type: String, required: true, default: null },
  web: { type: String, required: true, default: null },
  facebook: { type: String, required: false, default: null },
  twitter: { type: String, required: false, default: null },
  google: { type: String, required: false, default: null },
  instagram: { type: String, required: false, default: null },
  youtube: { type: String, required: false, default: null },
});

const filters = new Schema({});

const coachSchema = new mongoose.Schema({
  _id: objectId,
  name: { type: String, required: true, default: null },
  alias: { type: String, required: false, default: null },
  workPlace: { type: String, required: true, default: null },
  town: { type: String, required: true, default: null },
  street: { type: String, required: true, default: null },
  contact: contactSchema,
  descriptionBasic: {
    type: String,
    required: true,
    default: "No description.",
  },
  descriptionFull: {
    type: String,
    required: false,
    default: null,
  },
  agreement: {
    terms: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: Date.now() },
    },
    dataProcessinfForPropagation: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: Date.now() },
    },
  },
  owner: { type: String, required: true },
});

const CoachModel = mongoose.model("Coach", coachSchema);

module.exports = { coachSchema, CoachModel };
