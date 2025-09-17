const Resource = require("../models/Resources");

const postResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const resource = new Resource({
      branch: req.body.branch,
      subject: req.body.subject,
      bookName: req.body.bookName,
      file: req.file.filename,
      uploadedBy: req.user?._id || null, // if using auth middleware
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error("❌ Error uploading resource:", err);
    res.status(500).json({ message: "Error uploading resource", error: err.message });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("uploadedBy", "name email role").sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resources" });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resource" });
  }
};

module.exports = { postResource, getResources, getResourceById };
