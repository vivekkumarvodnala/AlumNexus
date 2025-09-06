const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  alumni: { type: String, required: false },
  role: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, enum: ["Online", "Offline"], default: "Online" },
  status: { type: String, enum: ["Open", "Filled"], default: "Open" },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  meetingLink: { type: String, default: "" }
});

module.exports = mongoose.model("Interview", interviewSchema);
