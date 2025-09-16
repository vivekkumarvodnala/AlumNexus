const fs = require("fs");
const path = require("path");
const Podcast = require("../models/Podcast");
const OpenAI = require("openai");

// Setup OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ===== Upload Podcast + Transcription =====
exports.uploadPodcast = async (req, res) => {
  console.log(req.file)
  try {
    const { title, description, alumni, isPublic } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    // Create podcast document
    let podcast = new Podcast({
      title,
      description,
      alumni,
      audioUrl: `/uploads/podcasts/${req.file.filename}`,
      isPublic: isPublic === "true",
    });

    // Transcribe audio using OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    podcast.transcript = transcription.text;

    // Save to DB
    await podcast.save();

    res.status(201).json({
      message: "Podcast uploaded and transcribed successfully",
      podcast,
    });
  } catch (error) {
    console.error("Error uploading podcast:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== Get All Public Podcasts =====
exports.getPublicPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== Get Podcast by ID =====
exports.getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== Delete Podcast =====
exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });

    const filePath = path.join(__dirname, "..", podcast.audioUrl);
    fs.promises.unlink(filePath).catch(err => console.warn("File delete error:", err.message));

    await podcast.deleteOne();
    res.json({ message: "Podcast deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
