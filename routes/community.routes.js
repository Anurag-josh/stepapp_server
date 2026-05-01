const express = require("express");

const {
  create,
  join,
  getOne,
  leaveCommunity,
} = require("../controllers/community.controller");

const auth = require("../middleware/auth");

const router = express.Router();

// ✅ CREATE COMMUNITY
router.post(
  "/create",
  auth,
  create
);

// ✅ JOIN COMMUNITY
router.post(
  "/join",
  auth,
  join
);

// ✅ LEAVE COMMUNITY
router.post(
  "/leave",
  auth,
  leaveCommunity
);

// ✅ GET COMMUNITY
router.get(
  "/:code",
  auth,
  getOne
);

module.exports = router;