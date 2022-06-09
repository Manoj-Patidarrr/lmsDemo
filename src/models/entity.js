//jshint esversion: 11
import mongoose from "mongoose";

const EntitySchema = mongoose.Schema({
  title: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("entity", EntitySchema);
