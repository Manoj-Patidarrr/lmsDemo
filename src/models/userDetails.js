// jshint esversion:9
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    unique: true,
    min: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePath: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: [
      "FT-HR",
      "FT-Designer",
      "FT-Developer",
      "FT-Tester",
      "FT-Manager",
      "Intern",
    ],
    default: "Intern",
  },
  technology: {
    type: Array,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  favourites: {
    courseIds: {
      type: Array,
      default: [],
    },
  },
  courseAccess: {
    type: Boolean,
    default: false,
  },
  socialMedia: {
    type: Object,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
},{strict:false});

export const User = mongoose.model("Users", UserSchema);
