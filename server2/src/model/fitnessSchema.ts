import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { Fitness } from "../types";

const contactSchema = {
  tel: { type: Number, required: false, default: null },
  mobile: { type: Number, required: false, default: null },
  email: { type: String, required: true },
  web: { type: String, required: false, default: null },
  facebook: { type: String, required: false, default: null },
  twitter: { type: String, required: false, default: null },
  google: { type: String, required: false, default: null },
  instagram: { type: String, required: false, default: null },
  youtube: { type: String, required: false, default: null },
};

const openHoursSchema = {
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
};

const filtersSchema = {
  equipment: [{ type: String, required: true }],
  general: [{ type: String, required: false, default: [] }],
  others: [{ type: String, required: false, default: [] }],
};

const picturesIdsSchema = {
  card: { type: String, required: true },
  detail: {
    main: { type: String, required: true },
    others: { type: [String], required: false, default: [] },
  },
};

const fitnessSchema = new Schema<Fitness>({
  _id: { type: ObjectId, required: false, default: new ObjectId() },
  name: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: Number, required: true },
  region: { type: Number, required: true },
  IN: { type: Number, required: true },
  priceLevel: { type: Number, required: true },
  contact: contactSchema,
  filters: filtersSchema,
  open: openHoursSchema,
  descriptionBasic: {
    type: String,
    required: true,
  },
  descriptionFull: {
    type: String,
    required: false,
    default: null,
  },
  pictures: picturesIdsSchema,
  agreement: {
    terms: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, required: false, default: new Date() },
    },
    dataProcessingForPropagation: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, required: false, default: new Date() },
    },
  },
  owner: { type: String, required: true },
  topped: {
    value: { type: Boolean, reguired: true, default: false },
    toDate: { type: Date, required: false, default: null },
  },
  approved: { type: Boolean, required: true, default: false },
  views: { type: Number, required: false, default: 0 },
  popularity: [{ type: String, required: false, default: [] }],
});

export const FitnessModel = model("Fitness", fitnessSchema, "fitnesses");
