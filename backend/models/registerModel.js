const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    gender: { type: String, required: true },
    registeringYear: { type: String, required: true },

    faculty: { type: String, required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    parentNo: { type: String, required: true },
    //filepath: { type: String, required: false }, // File path
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Register", registerSchema);
