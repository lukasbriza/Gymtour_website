const mongoose = require("mongoose");
const { Schema } = mongoose;

let objectId = new mongoose.Types.ObjectId().toString();

const userSchema = new Schema({
  _id: objectId,
  userName: { type: String, required: true },
  password: { type: String, required: true },
  fitnessOwned: [
    { fitnessId: { type: String, required: false, default: null } },
  ],
  coachOwnded: [{ coachId: { type: String, required: false, default: null } }],
  token: { type: String, required: false, default: null },
  isAdmin: { type: Boolean, required: false, default: false },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { userSchema, UserModel };
