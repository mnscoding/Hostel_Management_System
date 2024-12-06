const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
});

module.exports = mongoose.model("Test", testSchema);
