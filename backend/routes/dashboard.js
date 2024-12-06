const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();
const { getStudentCount } = require("../controllers/studentController");
const { getUserCount } = require("../controllers/userController");
const { getComplaintCount } = require("../controllers/complaintController");
const { getNoticeCount } = require("../controllers/noticeController");
const { getHostelCounts } = require("../controllers/hostelController");
const { getStaffCount } = require("../controllers/staffController");
const { getHostelApplyCount } = require("../controllers/hostelApplyController");

router.get("/studentCount", getStudentCount);
router.get("/userCount", getUserCount);
router.get("/complaintCount", getComplaintCount);
router.get("/noticeCount", getNoticeCount);
router.get("/hostelCount", getHostelCounts);
router.get("/staffCount", getStaffCount);
router.get("/hostelApplyCount", getHostelApplyCount);

module.exports = router;
