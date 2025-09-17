const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get all messages between 2 users
router.get("/:userId/:receiverId", async (req, res) => {
  try {
    const { userId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    })
      .populate("sender receiver", "name _id")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
