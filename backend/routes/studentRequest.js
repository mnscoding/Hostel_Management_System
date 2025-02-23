const express = require("express");
const router = express.Router();
const {
  getStudentRequests,
  getStudentRequest,
  createStudentRequest,
  deleteStudentRequest,
  updateStudentRequest,
  updateStudentRequestStatus,
} = require("../controllers/studentRequestController");

router.get("/", getStudentRequests);

router.get("/:id", getStudentRequest);

router.post("/", createStudentRequest);

router.delete("/:id", deleteStudentRequest);

router.patch("/:id", updateStudentRequest);

router.patch("/:id/status", updateStudentRequestStatus);

module.exports = router;
