// backend/routes/podcastRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {protect} = require("../middleware/authMiddleware");

const {
  uploadPodcast,
  getPublicPodcasts,
  getPodcastsByAlumni,
  getPodcastById,
  deletePodcast,
} = require("../controllers/podcastController");

// ===== Multer setup for audio uploads =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/podcasts/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===== Routes =====
router.get("/public", getPublicPodcasts);          // All public podcasts
router.get("/alumni/:id", getPodcastsByAlumni);   // All podcasts for a specific alumni
router.get("/:id", getPodcastById);               // Get podcast by ID
router.post("/upload",protect, upload.single("audio"), uploadPodcast); // Upload
router.delete("/:id", deletePodcast);             // Delete

module.exports = router;
