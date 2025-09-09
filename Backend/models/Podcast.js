const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    alumni: { type: String, required: true }, // user ID
    alumniName: { type: String, required: true }, // store name snapshot
    date: { type: Date, default: Date.now },
    audioUrl: { type: String, required: true },
    transcript: { type: String }, // optional auto-generated text
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
