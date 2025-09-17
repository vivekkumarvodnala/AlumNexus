const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  link: { type: String, required: true },
  location: String,
  type: {
    type: String,
    enum: ["Full-time", "Internship", "Part-time", "Contract"],
    default: "Full-time",
  },
  deadline: Date,
  description: String,
  file: String, // filename/path
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Referral", ReferralSchema);
