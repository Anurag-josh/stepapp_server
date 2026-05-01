const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  updateSteps,
} = require("../controllers/userController");

// ✅ UPDATE STEPS
router.put(
  "/steps",
  authMiddleware,
  updateSteps
);

module.exports = router;