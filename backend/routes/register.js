const express = require("express");
const {
  upload,
  uploadFile,
  getRegisters,
  deleteRegister,
  updateRegister,
  updateRegisterStatus,
} = require("../controllers/registerController");

const router = express.Router();

// Define the upload route
router.post("/register", upload.single("file"), uploadFile);

// Get all tests
router.get("/registers", getRegisters);

// Delete a test
router.delete("/registers/:id", deleteRegister);
router.patch("/registers/:id/", updateRegister);

//update status
router.patch("/registers/:id/status", updateRegisterStatus);

module.exports = router;
