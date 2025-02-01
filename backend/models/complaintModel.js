const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    description: {
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
      enum: ["unresolved", "resolved", "processing"],
      default: "unresolved",
    }, // New field
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
