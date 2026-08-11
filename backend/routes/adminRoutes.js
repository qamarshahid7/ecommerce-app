const express = require("express");
const router = express.Router();
const { getAdminStats, getUsers } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/stats").get(protect, admin, getAdminStats);
router.route("/users").get(protect, admin, getUsers);

module.exports = router;
