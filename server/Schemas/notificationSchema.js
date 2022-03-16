const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require("mongodb");

const notificationSchema = new Schema({
  _id: { type: ObjectId },
  object: {
    id: { type: ObjectId, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    created: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
});

const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);

module.exports = { notificationSchema, NotificationModel };
