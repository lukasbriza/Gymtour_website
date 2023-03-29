import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
  _id: { type: ObjectId, required: false, default: new ObjectId() },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  emailUpdate: {
    value: { type: String, default: null },
    validTo: { type: Date, default: new Date() },
  },
  fitnessOwned: [{ type: String, required: false }],
  coachOwned: [{ type: String, required: false }],
  isAdmin: { type: Boolean, required: false, default: false },
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
});

export const UserModel = model("User", userSchema, "users");
