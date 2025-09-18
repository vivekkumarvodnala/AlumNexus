// routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const { postResource, getResources, getResourceById } = require("../controllers/ResourceController");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resources"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes

// POST a new resource (protected)
router.post("/", protect, upload.single("file"), postResource);

// GET all resources
router.get("/", getResources);

// GET resource by ID
router.get("/:id", getResourceById);

module.exports = router;
