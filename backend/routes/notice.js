/*const express = require("express");
const Notice = require("../models/noticeModel");
const router = express.Router();
const {
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
} = require("../controllers/noticeController");

//get all notices
router.get("/", getNotices);

//get a single notice
router.get("/:id", getNotice);

//post a new notice
router.post("/", createNotice);

//delete a notice
router.delete("/:id", deleteNotice);

//update a notice
router.patch("/:id", updateNotice);

module.exports = router;*/

/*02.04
const express = require("express");
const router = express.Router();
const {
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
} = require("../controllers/noticeController");

// Get all notices
router.get("/", getNotices);

// Get a single notice
router.get("/:id", getNotice);

// Post a new notice
router.post("/", createNotice);

// Delete a notice
router.delete("/:id", deleteNotice);

// Update a notice (use PATCH for partial updates)
router.patch("/:id", updateNotice);

module.exports = router;*/

const express = require("express");
const router = express.Router();
const {
  upload,
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
} = require("../controllers/noticeController");

// Get all notices
router.get("/", getNotices);

// Get a single notice
router.get("/:id", getNotice);

// Post a new notice
router.post("/", upload.single("file"), createNotice);

// Delete a notice
router.delete("/:id", deleteNotice);

// Update a notice (use PATCH for partial updates)
router.patch("/:id", upload.single("file"), updateNotice);

module.exports = router;
