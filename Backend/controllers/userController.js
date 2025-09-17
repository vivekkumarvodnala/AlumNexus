const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    // user.phone = req.body.phone || user.phone;

    // ✅ If file uploaded, save file path
    if (req.file) {
      user.image = `/uploads/profile/${req.file.filename}`;
    } else if (req.body.image) {
      user.image = req.body.image;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      image: updatedUser.image,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc    Delete user
// @route   DELETE /api/users/profile
// @access  Private
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    console.log(req.body);
    const users = await User.find({}, '_id name role'); // only needed fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};
