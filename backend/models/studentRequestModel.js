const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentRequestSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currentHostel: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      maxLength: 500,
    },
    user_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    }, // New field
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentRequest", studentRequestSchema);
