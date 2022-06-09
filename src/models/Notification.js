//jshint esversion:11

import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
  entityID: {
    type: String,
    required: true,
  },
  entityTypeID: {
    type: String,
  },
  actor: {
    type: String,
  },
  notifier: {
    type: String,
    requried: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("notification", NotificationSchema);
