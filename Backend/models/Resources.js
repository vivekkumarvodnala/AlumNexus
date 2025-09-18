const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    branch: { type: String, required: true },
    subject: { type: String, required: true },
    bookName: { type: String, required: true },
    file: { type: String, required: true }, // stores filename
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
