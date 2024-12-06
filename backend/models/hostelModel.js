/*const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const existingStudentSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const hostelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  warden: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  maxStudents: {
    type: Number,
    required: true,
  },
  existingStudents: [existingStudentSchema], // Use an array of existingStudentSchema
});

module.exports = mongoose.model("Hostel", hostelSchema);*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const existingStudentSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const hostelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  warden: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  maxStudents: {
    type: Number,
    required: true,
  },
  existingStudents: {
    type: [existingStudentSchema],
    required: false, // Make existingStudents optional
    default: [], // Optional: Set a default empty array if not provided
  },
});

module.exports = mongoose.model("Hostel", hostelSchema);
