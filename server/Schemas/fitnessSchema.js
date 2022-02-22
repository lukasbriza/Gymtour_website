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

const openHours = new Schema({
  mon: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  tue: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  wed: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  thu: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  fri: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  sat: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
  sun: {
    from: { type: Number, required: false, default: null },
    to: { type: Number, required: false, default: null },
  },
});

const filters = new Schema({});

//chybí fotografie - binary data
const fitnessSchema = new Schema({
  _id: objectId,
  name: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: String, required: true },
  IN: { type: String || Number, required: true },
  district: { type: String, required: true },
  region: { type: String, required: true },
  contact: contactSchema,
  open: openHours,
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

const FitnessModel = mongoose.model("Fitness", fitnessSchema);

module.exports = { fitnessSchema, FitnessModel };
