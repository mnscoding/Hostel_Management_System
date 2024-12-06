const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
  hostel: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  filepath: { type: String, required: true },
});

module.exports = mongoose.model("Staff", staffSchema);
