const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();
const { getStudentCount } = require("../controllers/studentController");
const { getUserCount } = require("../controllers/userController");
const { getComplaintCount } = require("../controllers/complaintController");
const { getNoticeCount } = require("../controllers/noticeController");
const { getRegisterCount } = require("../controllers/registerController");
const { getHostelCounts } = require("../controllers/hostelController");
const { getStaffCount } = require("../controllers/staffController");
const { getHostelApplyCount } = require("../controllers/hostelApplyController");
const {
  getApprovedEmailCount,
} = require("../controllers/approvedEmailController");
const {
  getStudentRequestCount,
} = require("../controllers/studentRequestController");

router.get("/studentCount", getStudentCount);
router.get("/userCount", getUserCount);
router.get("/complaintCount", getComplaintCount);
router.get("/noticeCount", getNoticeCount);
router.get("/registerCount", getRegisterCount);
router.get("/hostelCount", getHostelCounts);
router.get("/staffCount", getStaffCount);
router.get("/hostelApplyCount", getHostelApplyCount);
router.get("/approvedEmailsCount", getApprovedEmailCount);
router.get("/transferCount", getStudentRequestCount);

module.exports = router;
