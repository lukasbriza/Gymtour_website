import { model, Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { Coach } from "../types";

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

const filtersSchema = {
  gender: { type: String, required: true },
  specialization: [{ type: String, required: true }],
  others: [{ type: String, required: false }],
};

const picturesIdsSchema = {
  card: { type: String, required: true },
  detail: {
    main: { type: String, required: true },
    others: { type: [String], required: true, default: [] },
  },
};

const coachSchema = new Schema<Coach>({
  _id: { type: ObjectId, required: false, default: new ObjectId() },
  name: { type: String, required: true },
  alias: { type: String, required: false, default: null },
  workPlace: { type: String, required: true },
  town: { type: Number, required: true },
  region: { type: Number, required: true },
  street: { type: String, required: true },
  priceLevel: { type: Number, required: true },
  contact: contactSchema,
  filters: filtersSchema,
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
  pictures: picturesIdsSchema,
  agreement: {
    terms: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: new Date() },
    },
    dataProcessingForPropagation: {
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
  views: { type: Number, required: false, default: 0 },
  popularity: [{ type: String, required: false }],
});

export const CoachModel = model("Coach", coachSchema, "coaches");
