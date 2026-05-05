const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ✅ GET CURRENT USER
const authMiddleware = require("../middleware/auth");
router.get("/me", authMiddleware, (req, res) => {
  const User = require("../models/User");
  User.findById(req.user.id)
    .then((user) => {
      res.json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: "Server error" });
    });
});

module.exports = router;