const Student = require("../models/studentModel");
const Hostel = require("../models/hostelModel");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");
const multer = require("multer");
const path = require("path");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// Initialize upload variable with Multer storage configuration
const upload = multer({ storage });

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

/*04.22
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
    image,
  } = req.body;

  // const image = req.file ? req.file.path : null;

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
      //optional
      student.image = image || student.image;
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
      const message = `Dear ${student.name}, \n\nYou have been assigned to ${hostel}.`;
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
        image,
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
};*/
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
    image,
  } = req.body;

  try {
    // Check if the student already exists
    let student = await Student.findOne({ regNo });

    if (student) {
      // If student exists and is being assigned to a different hostel
      if (student.hostel && student.hostel !== hostel) {
        // Remove student from old hostel
        const oldHostelDoc = await Hostel.findOne({ name: student.hostel });
        if (oldHostelDoc) {
          const existingStudentIndex = oldHostelDoc.existingStudents.findIndex(
            (es) =>
              es.year === student.registeringYear &&
              es.faculty === student.faculty
          );

          if (existingStudentIndex !== -1) {
            oldHostelDoc.existingStudents[existingStudentIndex].count -= 1;

            // If count goes to zero, remove the entry
            if (
              oldHostelDoc.existingStudents[existingStudentIndex].count <= 0
            ) {
              oldHostelDoc.existingStudents.splice(existingStudentIndex, 1);
            }
            await oldHostelDoc.save();
          }
        }
      }

      // Update existing student record
      student.name = name;
      student.gender = gender;
      student.registeringYear = registeringYear;
      student.hostel = hostel;
      student.faculty = faculty;
      student.department = department;
      student.address = address;
      student.contactNo = contactNo;
      student.email = email;
      student.parentNo = parentNo;
      student.image = image || student.image;
      await student.save();

      // Add student to new hostel
      const newHostelDoc = await Hostel.findOne({ name: hostel });
      if (newHostelDoc) {
        const existingStudentIndex = newHostelDoc.existingStudents.findIndex(
          (es) => es.year === registeringYear && es.faculty === faculty
        );

        if (existingStudentIndex !== -1) {
          newHostelDoc.existingStudents[existingStudentIndex].count += 1;
        } else {
          newHostelDoc.existingStudents.push({
            year: registeringYear,
            faculty: faculty,
            count: 1,
          });
        }
        await newHostelDoc.save();
      }

      const subject = "Hostel Assignment Update";
      const message = `Dear ${student.name},\n\nYour hostel assignment has been updated to ${hostel} for year ${registeringYear}.`;
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
        image,
      });

      // Add student to new hostel
      const newHostelDoc = await Hostel.findOne({ name: hostel });
      if (newHostelDoc) {
        const existingStudentIndex = newHostelDoc.existingStudents.findIndex(
          (es) => es.year === registeringYear && es.faculty === faculty
        );

        if (existingStudentIndex !== -1) {
          newHostelDoc.existingStudents[existingStudentIndex].count += 1;
        } else {
          newHostelDoc.existingStudents.push({
            year: registeringYear,
            faculty: faculty,
            count: 1,
          });
        }
        await newHostelDoc.save();
      }

      const subject = "Hostel Assignment";
      const message = `Dear ${student.name},\n\nYou have been assigned to ${hostel} for year ${registeringYear}.`;
      await sendMail(student.email, subject, message);

      return res.status(200).json(student);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateStudentDetails = async (req, res) => {
  const { regNo, name, currentHostel } = req.body;

  try {
    // Find the student by regNo
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Validate name and currentHostel
    if (
      student.name.toLowerCase() !== name.toLowerCase() ||
      student.hostel.toLowerCase() !== currentHostel.toLowerCase()
    ) {
      return res.status(400).json({ error: "Student details do not match." });
    }

    // If everything matches, return success
    res.status(200).json({ message: "Student details are valid.", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a student
/*
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
};*/

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
  const { hostel: newHostel, registeringYear, faculty } = req.body; // New hostel and other details from request body

  // Update the student details
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true } // Return the updated document
  );

  // If the hostel has changed, update both hostels' student counts
  if (oldHostel !== newHostel) {
    try {
      // Remove student from old hostel
      if (oldHostel) {
        const oldHostelDoc = await Hostel.findOne({ name: oldHostel });
        if (oldHostelDoc) {
          const existingStudentIndex = oldHostelDoc.existingStudents.findIndex(
            (es) =>
              es.year === student.registeringYear &&
              es.faculty === student.faculty
          );

          if (existingStudentIndex !== -1) {
            oldHostelDoc.existingStudents[existingStudentIndex].count -= 1;

            // If count goes to zero, remove the entry
            if (
              oldHostelDoc.existingStudents[existingStudentIndex].count <= 0
            ) {
              oldHostelDoc.existingStudents.splice(existingStudentIndex, 1);
            }
            await oldHostelDoc.save();
          }
        }
      }

      // Add student to new hostel
      if (newHostel) {
        const newHostelDoc = await Hostel.findOne({ name: newHostel });
        if (newHostelDoc) {
          const existingStudentIndex = newHostelDoc.existingStudents.findIndex(
            (es) =>
              es.year === (registeringYear || student.registeringYear) &&
              es.faculty === (faculty || student.faculty)
          );

          if (existingStudentIndex !== -1) {
            newHostelDoc.existingStudents[existingStudentIndex].count += 1;
          } else {
            newHostelDoc.existingStudents.push({
              year: registeringYear || student.registeringYear,
              faculty: faculty || student.faculty,
              count: 1,
            });
          }
          await newHostelDoc.save();
        }
      }

      // Send email notification if email exists
      if (updatedStudent.email) {
        const subject = "Hostel Change Notification";
        const message = `Dear ${updatedStudent.name},\n\nYour hostel has been changed from ${oldHostel} to ${newHostel}.`;
        await sendMail(updatedStudent.email, subject, message);
      }
    } catch (error) {
      console.error("Error updating hostel counts:", error);
      // Even if hostel update fails, we still return the student update as successful
      // but log the error for debugging
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

/*2025.04.22
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
};*/

const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Validate student ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid student ID format");
    }

    // Find and delete the student (within transaction)
    const student = await Student.findOneAndDelete({ _id: id }).session(
      session
    );

    if (!student) {
      throw new Error("Student not found");
    }

    console.log(
      `Deleting student ${student.name} (${student.regNo}) from ${student.hostel}`
    );

    // Update the hostel's student count (within transaction)
    const hostelDoc = await Hostel.findOne({ name: student.hostel }).session(
      session
    );

    if (hostelDoc) {
      const existingStudentIndex = hostelDoc.existingStudents.findIndex(
        (es) =>
          es.year === student.registeringYear && es.faculty === student.faculty
      );

      if (existingStudentIndex !== -1) {
        // Decrement count and remove if zero
        hostelDoc.existingStudents[existingStudentIndex].count -= 1;

        if (hostelDoc.existingStudents[existingStudentIndex].count <= 0) {
          hostelDoc.existingStudents.splice(existingStudentIndex, 1);
          console.log(
            `Removed empty entry for ${student.faculty} year ${student.registeringYear} from ${hostelDoc.name}`
          );
        }

        await hostelDoc.save();
        console.log(`Updated hostel ${hostelDoc.name} student count`);
      } else {
        console.warn(
          `No matching student group found in hostel ${hostelDoc.name}`
        );
      }
    } else {
      console.warn(
        `Hostel ${student.hostel} not found - proceeding with deletion`
      );
    }

    // Send notification email (outside transaction)
    if (student.email) {
      try {
        const subject = "Hostel Assignment Cancelled";
        const message = `Dear ${student.name},\n\nYour hostel assignment to ${student.hostel} has been cancelled.\n\nIf this was a mistake, please contact the administration immediately.`;
        await sendMail(student.email, subject, message);
        console.log(`Notification sent to ${student.email}`);
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // Don't fail the operation if email fails
      }
    }

    // Commit the transaction
    await session.commitTransaction();
    console.log(`Successfully deleted student ${student.regNo}`);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      deletedStudent: student,
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    console.error("Error deleting student:", error.message);

    res.status(error.message === "Student not found" ? 404 : 400).json({
      success: false,
      message: error.message,
      error: error.message.includes("validation") ? error.errors : undefined,
    });
  } finally {
    // End the session
    session.endSession();
  }
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
  upload,
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentCount,
  validateStudentDetails,
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
