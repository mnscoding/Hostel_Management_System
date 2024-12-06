const express = require("express");
const Hostel = require("../models/hostelModel");
const router = express.Router();
const {
  getHostels,
  getHostel,
  createHostel,
  deleteHostel,
  updateHostel,
} = require("../controllers/hostelController");

//get all hostels
router.get("/", getHostels);

//get a single hostel
router.get("/:id", getHostel);

//post a new hostel
router.post("/", createHostel);

//delete a hostel
router.delete("/:id", deleteHostel);

//update a hostel
router.patch("/:id", updateHostel);

module.exports = router;
