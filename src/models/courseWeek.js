//jshint esversion:11

import mongoose from "mongoose";

const courseWeekSchema = mongoose.Schema({
  courseWeekMap: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("courseWeek", courseWeekSchema);
