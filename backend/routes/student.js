const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

//get all students
router.get("/", getStudents);

//get a single student
router.get("/:id", getStudent);

//post a new student
router.post("/", createStudent);

//delete a student
router.delete("/:id", deleteStudent);

//update a student
router.patch("/:id", updateStudent);

module.exports = router;
