// backend/controllers/podcastController.js
const fs = require("fs");
const path = require("path");
const Podcast = require("../models/Podcast");
const User = require("../models/User");

// ===== Upload Podcast =====
const uploadPodcast = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    // Get logged-in user ID from middleware
    const alumniId = req.user.id;  

    // Fetch user to get name
    const user = await User.findById(alumniId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const podcast = new Podcast({
      title,
      description,
      alumni: alumniId,                  // store user ID
      alumniName: user.name,             // store user’s name dynamically
      audioUrl: `/uploads/podcasts/${req.file.filename}`,
      isPublic: isPublic === "true",
    });

    await podcast.save();
    console.log("🎤 Podcast uploaded successfully:", podcast.title);

    res.status(201).json({ message: "Podcast uploaded successfully", podcast });
  } catch (error) {
    console.error("Error uploading podcast:", error.message);
    res.status(500).json({ message: error.message });
  }
};




// ===== Get All Public Podcasts =====
const getPublicPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (error) {
    console.error("Error fetching public podcasts:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ===== Get Podcasts by Alumni ID =====
const getPodcastsByAlumni = async (req, res) => {
  try {
    const alumniId = req.params.id;
    console.log("Fetching podcasts for alumni:", alumniId);

    const podcasts = await Podcast.find({ alumni: alumniId }).sort({ createdAt: -1 });
    console.log(podcasts);
    if (!podcasts || podcasts.length === 0) {
      return res.status(404).json({ message: "No podcasts found for this alumni" });
    }

    console.log(`Found ${podcasts.length} podcasts`);
    res.json(podcasts);
  } catch (error) {
    console.error("Error fetching alumni podcasts:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ===== Get Podcast by ID =====
const getPodcastById = async (req, res) => {
  try {
    const podcastId = req.params.id;
    console.log("Fetching podcast ID:", podcastId);

    const podcast = await Podcast.findById(podcastId);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });

    console.log("Podcast found:", podcast.title);
    res.json(podcast);
  } catch (error) {
    console.error("Error fetching podcast:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ===== Delete Podcast =====
const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });

    const filePath = path.join(__dirname, "..", podcast.audioUrl);
    fs.promises.unlink(filePath).catch(err => console.warn("File delete error:", err.message));

    await podcast.deleteOne();
    console.log("Podcast deleted:", podcast.title);
    res.json({ message: "Podcast deleted successfully" });
  } catch (error) {
    console.error("Error deleting podcast:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ===== Export all functions at once =====
module.exports = {
  uploadPodcast,
  getPublicPodcasts,
  getPodcastsByAlumni,
  getPodcastById,
  deletePodcast,
};
