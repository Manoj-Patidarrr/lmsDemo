//jshint esversion:11

import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  likes: {
    type: Object,
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

export default mongoose.model("comments", commentSchema);
