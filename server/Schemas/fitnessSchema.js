const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  tel: { type: Number, required: false, default: null },
  mobile: { type: Number, required: false, default: null },
  email: { type: String, required: true },
  web: { type: String, required: false, default: null },
  facebook: { type: String, required: false, default: null },
  twitter: { type: String, required: false, default: null },
  google: { type: String, required: false, default: null },
  instagram: { type: String, required: false, default: null },
  youtube: { type: String, required: false, default: null },
});

const openHours = new Schema({
  mon: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  tue: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  wed: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  thu: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  fri: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  sat: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
  sun: {
    from: { type: Number, required: true, default: null },
    to: { type: Number, required: true, default: null },
  },
});

const filters = new Schema({
  equipment: [{ type: Number, required: true }],
  general: [{ type: Number, required: false }],
  others: [{ type: Number, required: false }],
});

//chybí fotografie - binary data
const fitnessSchema = new Schema({
  _id: { type: ObjectId },
  name: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: Number, required: true },
  region: { type: Number, required: true },
  IN: { type: Number, required: true },
  priceLevel: { type: Number, required: true },
  contact: contactSchema,
  filters: filters,
  open: openHours,
  descriptionBasic: {
    type: String,
    required: true,
  },
  descriptionFull: {
    type: String,
    required: false,
    default: null,
  },
  agreement: {
    terms: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: new Date() },
    },
    dataProcessinfForPropagation: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: new Date() },
    },
  },
  owner: { type: String, required: true },
  topped: {
    value: { type: Boolean, reguired: true, default: false },
    toDate: { type: Date, required: false, default: null },
  },
  approved: { type: Boolean, required: true, default: false },
});

const FitnessModel = mongoose.model("Fitness", fitnessSchema, "fitnesses");

module.exports = { fitnessSchema, FitnessModel };
