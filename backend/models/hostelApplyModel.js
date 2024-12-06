const mongoose = require("mongoose");

const hostelApplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  contactNo: { type: String, required: true },
  distance: { type: Number, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  faculty: { type: String, required: true },
  department: { type: String, required: true },
  income: { type: String, required: true },
  filepath: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("HostelApply", hostelApplySchema);
