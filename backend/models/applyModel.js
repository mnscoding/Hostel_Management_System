const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    distanceFromHome: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Apply", applySchema);
