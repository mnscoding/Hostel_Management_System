const Student = require("../models/studentModel");
const Hostel = require("../models/hostelModel");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");

// Get all students
const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });
  res.status(200).json(students);
};

// Get a single student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json(student);
};

// Create new student
/*const createStudent = async (req, res) => {
  const {
    name,
    regNo,
    gender,
    registeringYear,
    hostel,
    faculty,
    department,
    address,
    contactNo,
    email,
    parentNo,
  } = req.body;

  try {
    const student = await Student.create({
      name,
      regNo,
      gender,
      registeringYear,
      hostel,
      faculty,
      department,
      address,
      contactNo,
      email,
      parentNo,
    });

    // Update hostel's existing students count
    const hostelDoc = await Hostel.findOne({ name: hostel });

    if (hostelDoc) {
      const existingStudentIndex = hostelDoc.existingStudents.findIndex(
        (es) => es.year === registeringYear && es.faculty === faculty
      );

      if (existingStudentIndex !== -1) {
        hostelDoc.existingStudents[existingStudentIndex].count += 1;
      } else {
        hostelDoc.existingStudents.push({
          year: registeringYear,
          faculty: faculty,
          count: 1,
        });
      }

      await hostelDoc.save();
    }

    const subject = `Hostel Management System`;
    const message = `Dear ${student.name}, You have been assigned to ${hostel}`;

    // Send email to the applicant
    await sendMail(student.email, subject, message);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/
// Create or update student
const createStudent = async (req, res) => {
  const {
    name,
    regNo,
    gender,
    registeringYear,
    hostel,
    faculty,
    department,
    address,
    contactNo,
    email,
    parentNo,
  } = req.body;

  try {
    // Check if the student already exists
    let student = await Student.findOne({ regNo });

    if (student) {
      // Update existing student record
      student.registeringYear = registeringYear;
      student.hostel = hostel;
      student.address = address;
      student.contactNo = contactNo;
      student.email = email;
      student.parentNo = parentNo;

      await student.save();

      // Update hostel's existing students count
      const hostelDoc = await Hostel.findOne({ name: hostel });
      if (hostelDoc) {
        // Update the count for the existing hostel
        const existingStudentIndex = hostelDoc.existingStudents.findIndex(
          (es) => es.year === registeringYear && es.faculty === faculty
        );

        if (existingStudentIndex !== -1) {
          hostelDoc.existingStudents[existingStudentIndex].count += 1;
        } else {
          hostelDoc.existingStudents.push({
            year: registeringYear,
            faculty: faculty,
            count: 1,
          });
        }

        await hostelDoc.save();
      }

      const subject = "Hostel Management System";
      const message = `Dear ${student.name}, you have been assigned to ${hostel}.`;
      await sendMail(student.email, subject, message);

      return res.status(200).json(student);
    } else {
      // If the student doesn't exist, create a new one
      student = await Student.create({
        name,
        regNo,
        gender,
        registeringYear,
        hostel,
        faculty,
        department,
        address,
        contactNo,
        email,
        parentNo,
      });

      // Update hostel's existing students count
      const hostelDoc = await Hostel.findOne({ name: hostel });
      if (hostelDoc) {
        const existingStudentIndex = hostelDoc.existingStudents.findIndex(
          (es) => es.year === registeringYear && es.faculty === faculty
        );

        if (existingStudentIndex !== -1) {
          hostelDoc.existingStudents[existingStudentIndex].count += 1;
        } else {
          hostelDoc.existingStudents.push({
            year: registeringYear,
            faculty: faculty,
            count: 1,
          });
        }

        await hostelDoc.save();
      }

      const subject = "Hostel Management System";
      const message = `Dear ${student.name}, you have been assigned to ${hostel}.`;
      await sendMail(student.email, subject, message);

      return res.status(200).json(student);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  const oldHostel = student.hostel; // Save the old hostel
  const { hostel } = req.body; // New hostel from request body

  // Update the student details
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true } // Return the updated document
  );

  if (oldHostel !== hostel) {
    // If the hostel has changed
    const oldHostelDoc = await Hostel.findOne({ name: oldHostel });
    const newHostelDoc = await Hostel.findOne({ name: hostel });

    if (oldHostelDoc) {
      // Decrement the count in the old hostel
      const existingStudentIndex = oldHostelDoc.existingStudents.findIndex(
        (es) =>
          es.year === student.registeringYear && es.faculty === student.faculty
      );

      if (existingStudentIndex !== -1) {
        oldHostelDoc.existingStudents[existingStudentIndex].count -= 1;

        // If count goes to zero, optionally remove the entry
        if (oldHostelDoc.existingStudents[existingStudentIndex].count <= 0) {
          oldHostelDoc.existingStudents.splice(existingStudentIndex, 1);
        }
        await oldHostelDoc.save();
      }
    }

    if (newHostelDoc) {
      // Increment the count in the new hostel
      const existingStudentIndex = newHostelDoc.existingStudents.findIndex(
        (es) =>
          es.year === student.registeringYear && es.faculty === student.faculty
      );

      if (existingStudentIndex !== -1) {
        newHostelDoc.existingStudents[existingStudentIndex].count += 1;
      } else {
        newHostelDoc.existingStudents.push({
          year: student.registeringYear,
          faculty: student.faculty,
          count: 1,
        });
      }

      await newHostelDoc.save();
    }
  }

  res.status(200).json(updatedStudent);
};

// Delete a student
/*const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  // Decrement the count in the hostel
  const hostelDoc = await Hostel.findOne({ name: student.hostel });

  if (hostelDoc) {
    const existingStudentIndex = hostelDoc.existingStudents.findIndex(
      (es) =>
        es.year === student.registeringYear && es.faculty === student.faculty
    );

    if (existingStudentIndex !== -1) {
      hostelDoc.existingStudents[existingStudentIndex].count -= 1;

      // If count goes to zero, optionally remove the entry
      if (hostelDoc.existingStudents[existingStudentIndex].count <= 0) {
        hostelDoc.existingStudents.splice(existingStudentIndex, 1);
      }

      await hostelDoc.save();
    }
  }

  res.status(200).json(student);
};*/
// Delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  // Decrement the count in the hostel
  const hostelDoc = await Hostel.findOne({ name: student.hostel });

  if (hostelDoc) {
    const existingStudentIndex = hostelDoc.existingStudents.findIndex(
      (es) =>
        es.year === student.registeringYear && es.faculty === student.faculty
    );

    if (existingStudentIndex !== -1) {
      hostelDoc.existingStudents[existingStudentIndex].count -= 1;

      // If count goes to zero, remove the entry
      if (hostelDoc.existingStudents[existingStudentIndex].count <= 0) {
        hostelDoc.existingStudents.splice(existingStudentIndex, 1);
      }

      await hostelDoc.save();
    }
  }

  res.status(200).json(student);
};

// Get count of students
const getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentCount,
};

/*const Student = require("../models/studentModel");
const Hostel = require("../models/hostelModel");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");

// Get all students
const getStudents = async (req, res) => {
  ///////new from here to
  const { regNo } = req.query; // Get regNo from query params

  if (regNo) {
    const student = await Student.find({ regNo });
    return res.status(200).json(student); // Return found students
  }
  //////here
  const students = await Student.find({}).sort({ createdAt: -1 });
  res.status(200).json(students);
};

// Get a single student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json(student);
};

// Create new student
const createStudent = async (req, res) => {
  const {
    name,
    regNo,
    gender,
    registeringYear,
    hostel,
    faculty,
    department,
    address,
    contactNo,
    email,
    parentNo,
  } = req.body;

  try {
    const student = await Student.create({
      name,
      regNo,
      gender,
      registeringYear,
      hostel,
      faculty,
      department,
      address,
      contactNo,
      email,
      parentNo,
    });

    // Update hostel's existing students count
    const hostelDoc = await Hostel.findOne({ name: hostel });

    if (hostelDoc) {
      const existingStudentIndex = hostelDoc.existingStudents.findIndex(
        (es) => es.year === registeringYear && es.faculty === faculty
      );

      if (existingStudentIndex !== -1) {
        hostelDoc.existingStudents[existingStudentIndex].count += 1;
      } else {
        hostelDoc.existingStudents.push({
          year: registeringYear,
          faculty: faculty,
          count: 1,
        });
      }

      await hostelDoc.save();
    }

    const subject = `Hostel Management System`;
    const message = `Dear ${student.name}, You have been assigned to ${hostel}`;

    // Send email to the applicant
    await sendMail(student.email, subject, message);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  const oldHostel = student.hostel; // Save the old hostel
  const { hostel } = req.body; // New hostel from request body

  // Create an object to hold the updates while preserving some fields
  const updates = {};

  // Check which fields should be updated
  if (req.body.address) updates.address = req.body.address;
  if (req.body.contactNo) updates.contactNo = req.body.contactNo;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.parentNo) updates.parentNo = req.body.parentNo;

  // Update the student details
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: id },
    { ...updates, hostel }, // Only include the fields that need to be updated
    { new: true } // Return the updated document
  );

  // Handle hostel counts as before
  if (oldHostel !== hostel) {
    const oldHostelDoc = await Hostel.findOne({ name: oldHostel });
    const newHostelDoc = await Hostel.findOne({ name: hostel });

    if (oldHostelDoc) {
      // Decrement the count in the old hostel
      const existingStudentIndex = oldHostelDoc.existingStudents.findIndex(
        (es) =>
          es.year === student.registeringYear && es.faculty === student.faculty
      );

      if (existingStudentIndex !== -1) {
        oldHostelDoc.existingStudents[existingStudentIndex].count -= 1;

        // If count goes to zero, optionally remove the entry
        if (oldHostelDoc.existingStudents[existingStudentIndex].count <= 0) {
          oldHostelDoc.existingStudents.splice(existingStudentIndex, 1);
        }
        await oldHostelDoc.save();
      }
    }

    if (newHostelDoc) {
      // Increment the count in the new hostel
      const existingStudentIndex = newHostelDoc.existingStudents.findIndex(
        (es) =>
          es.year === student.registeringYear && es.faculty === student.faculty
      );

      if (existingStudentIndex !== -1) {
        newHostelDoc.existingStudents[existingStudentIndex].count += 1;
      } else {
        newHostelDoc.existingStudents.push({
          year: student.registeringYear,
          faculty: student.faculty,
          count: 1,
        });
      }

      await newHostelDoc.save();
    }
  }

  res.status(200).json(updatedStudent);
};

// Delete a student
/*const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  // Decrement the count in the hostel
  const hostelDoc = await Hostel.findOne({ name: student.hostel });

  if (hostelDoc) {
    const existingStudentIndex = hostelDoc.existingStudents.findIndex(
      (es) =>
        es.year === student.registeringYear && es.faculty === student.faculty
    );

    if (existingStudentIndex !== -1) {
      hostelDoc.existingStudents[existingStudentIndex].count -= 1;

      // If count goes to zero, optionally remove the entry
      if (hostelDoc.existingStudents[existingStudentIndex].count <= 0) {
        hostelDoc.existingStudents.splice(existingStudentIndex, 1);
      }

      await hostelDoc.save();
    }
  }

  res.status(200).json(student);
};*/
// Delete a student
/*const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  // Decrement the count in the hostel
  const hostelDoc = await Hostel.findOne({ name: student.hostel });

  if (hostelDoc) {
    const existingStudentIndex = hostelDoc.existingStudents.findIndex(
      (es) =>
        es.year === student.registeringYear && es.faculty === student.faculty
    );

    if (existingStudentIndex !== -1) {
      hostelDoc.existingStudents[existingStudentIndex].count -= 1;

      // If count goes to zero, remove the entry
      if (hostelDoc.existingStudents[existingStudentIndex].count <= 0) {
        hostelDoc.existingStudents.splice(existingStudentIndex, 1);
      }

      await hostelDoc.save();
    }
  }

  res.status(200).json(student);
};

// Get count of students
const getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentCount,
};*/
