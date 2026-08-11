const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Route for registering a user
router.post("/", registerUser);

// Route for logging in a user
router.post("/login", authUser);

// Route for admin to view all registered users
router.get("/", protect, admin, getUsers);

module.exports = router;
