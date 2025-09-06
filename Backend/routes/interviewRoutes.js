const express = require("express");
const router = express.Router();
const { getInterviews, bookInterview } = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getInterviews);
router.post("/:id/book", protect, bookInterview);

module.exports = router;
