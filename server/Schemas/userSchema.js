const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: ObjectId },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fitnessOwned: [
    {
      _id: false,
      required: false,
      fitnessId: { type: String, required: false },
    },
  ],
  coachOwned: [
    {
      _id: false,
      required: false,
      coachId: { type: String, required: false },
    },
  ],
  isAdmin: { type: Boolean, required: true, default: false },
  agreement: {
    terms: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: Date.now().toLocaleString() },
    },
    dataProcessinfForPropagation: {
      status: { type: Boolean, required: true },
      awarded: { type: Date, default: Date.now().toLocaleString() },
    },
  },
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = { userSchema, UserModel };
