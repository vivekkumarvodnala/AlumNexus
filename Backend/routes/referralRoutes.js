const express = require("express");
const multer = require("multer");
const path = require("path");
const Referral = require("../models/Referral");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// File upload (PDF only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/referrals"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST referral (alumni only)
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const referral = new Referral({
      ...req.body,
      file: req.file ? req.file.filename : null,
      postedBy: req.user._id,
    });
    await referral.save();
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ message: "Error posting referral", error: err.message });
  }
});

// GET all referrals (students see them)
router.get("/", protect, async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching referrals", error: err.message });
  }
});

module.exports = router;
