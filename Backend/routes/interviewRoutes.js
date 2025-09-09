const express = require("express");
const {
  getInterviews,
  createInterview,
  bookInterview,
  getMyCreatedSlots,
  getMyBookings,
  updateInterview,
  deleteInterview,
} = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getInterviews);

// Alumni/Admin only
router.post("/", protect, createInterview);
router.put("/:id", protect, updateInterview);
router.delete("/:id", protect, deleteInterview);
router.get("/mine", protect, getMyCreatedSlots);

// Student only
router.post("/:id/book", protect, bookInterview);
router.get("/bookings", protect, getMyBookings);

module.exports = router;
