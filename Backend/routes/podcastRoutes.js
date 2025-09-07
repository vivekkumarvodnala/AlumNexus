const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const podcastController = require("../controllers/podcastController");

const router = express.Router();

// ===== Multer Setup =====
const uploadDir = "uploads/podcasts/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) cb(null, true);
    else cb(new Error("Only audio files are allowed"), false);
  },
});

// ===== Routes =====
router.post("/upload", upload.single("audio"), podcastController.uploadPodcast);

router.get("/", podcastController.getPublicPodcasts);

router.get("/:id", podcastController.getPodcastById);

router.delete("/:id", podcastController.deletePodcast);

module.exports = router;
