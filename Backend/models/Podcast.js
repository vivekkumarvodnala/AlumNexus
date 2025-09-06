const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    alumni: { type: String, required: true },
    date: { type: Date, default: Date.now },
    audioUrl: { type: String, required: true }, // file path or cloud storage link
    transcript: { type: String }, // generated text from audio
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
