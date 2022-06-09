// jshint esversion:6

import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
  },
  level: {
    type: String,
  },
  refType: {
    type: Object,
  },
  author: {
    type: Object,
    required: true,
  },
  userActions: {
    type: Object,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("courses", courseSchema);
