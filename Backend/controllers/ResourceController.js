const Resource = require("../models/Resources");

const postResource = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.user:", req.user);

  try {
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const resource = new Resource({
      branch: req.body.branch,
      subject: req.body.subject,
      bookName: req.body.bookName,
      file: req.file.filename,
      uploadedBy: req.user?._id || null,
    });

    const saved = await resource.save();
    console.log("Saved resource:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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
