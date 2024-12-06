const mongoose = require("mongoose");

const approvedEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ApprovedEmail", approvedEmailSchema);
