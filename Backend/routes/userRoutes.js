const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Profile routes
router.get('/allUsers',getAllUsers);
router.get("/get-profile", protect, getUserProfile);
router.put("/update-profile", protect, upload.single("image"), updateUserProfile);

router.delete("/delete-profile", protect, deleteUser);



module.exports = router;
