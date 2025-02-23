const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();
const {
  upload,
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  validateStudentDetails,
} = require("../controllers/studentController");

router.post("/validate", validateStudentDetails);

//get all students
router.get("/", getStudents);

//get a single student
router.get("/:id", getStudent);

//post a new student
router.post("/", upload.single("file"), createStudent);

//delete a student
router.delete("/:id", deleteStudent);

//update a student
router.patch("/:id", updateStudent);

module.exports = router;
