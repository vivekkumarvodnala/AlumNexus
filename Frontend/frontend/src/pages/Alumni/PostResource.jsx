// Alumni/PostResource.jsx
import React, { useState } from "react";
import { FaFileUpload, FaCheckCircle, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider";

export default function PostResource() {
  const { darkMode } = useTheme();

  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [bookName, setBookName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emojiReaction, setEmojiReaction] = useState("");

  const allowedFormats = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
  ];
  const maxSize = 20 * 1024 * 1024; // 20MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!allowedFormats.includes(selectedFile.type)) {
      setError("❌ Only PDF, DOCX, PPTX allowed.");
      setFile(null);
    } else if (selectedFile.size > maxSize) {
      setError("❌ File size exceeds 20MB.");
      setFile(null);
    } else {
      setFile(selectedFile);
      setError("");
    }
  };

 const handleSubmit = async () => {
  if (!branch || !subject || !bookName || !file) {
    setError("❌ Fill all fields and select a valid file.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("subject", subject);
    formData.append("bookName", bookName);
    formData.append("file", file); // MUST match Multer's key
    // Add token if your API is protected
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/api/resources", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Upload failed");
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    // Clear form
    setBranch("");
    setSubject("");
    setBookName("");
    setFile(null);
    setEmojiReaction("");
    setError("");
  } catch (err) {
    setError(err.message);
  }
};

  const copyLink = () => {
    navigator.clipboard.writeText("https://example.com/resource-link");
    alert("Link copied to clipboard!");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#F9FAFB] text-gray-900"} min-h-screen flex justify-center p-8`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-5xl p-10 rounded-3xl shadow-2xl border relative ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaFileUpload className={`text-3xl ${darkMode ? "text-yellow-400" : "text-[#0D9488]"}`} />
          <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Share Your Resource
          </h2>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={`w-full p-3 rounded-lg border transition ${
              darkMode ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-3 rounded-lg border transition ${
              darkMode ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className={`w-full p-3 rounded-lg border transition ${
              darkMode ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* File Upload */}
        <label
          htmlFor="fileUpload"
          className={`flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-300 ${
            darkMode ? "border-gray-700 hover:border-yellow-300" : "border-gray-300 hover:border-[#8B5CF6]"
          }`}
        >
          <FaFileUpload className={`text-5xl mb-4 ${darkMode ? "text-yellow-400" : "text-[#0D9488]"}`} />
          <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>
            Click or Drag & Drop to Upload
          </span>
          <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Preview / Error / Emoji */}
        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 font-medium text-green-500">
                <FaCheckCircle /> {file.name}
              </div>
            </motion.div>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 flex-col md:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-[#0D9488] text-white hover:bg-[#059669]"
            }`}
          >
            Submit Resource
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPreviewOpen(true)}
            className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-yellow-300"
                : "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
            }`}
          >
            Preview
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.clipboard.writeText("https://example.com/resource-link")}
            className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-yellow-300"
                : "bg-[#0D9488] text-white hover:bg-[#059669]"
            }`}
          >
            Copy Link
          </motion.button>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-lg font-semibold z-50"
            >
              🎉 Resource shared successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Page Preview Modal */}
        <AnimatePresence>
          {previewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className={`w-full max-w-3xl p-8 rounded-3xl shadow-2xl border ${
                  darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{bookName || "Resource Name"}</h3>
                <p className="mb-2"><span className="font-semibold">Branch:</span> {branch || "N/A"}</p>
                <p className="mb-2"><span className="font-semibold">Subject:</span> {subject || "N/A"}</p>
                <p className="mb-2"><span className="font-semibold">File:</span> {file?.name || "N/A"}</p>

                <button
                  onClick={() => setPreviewOpen(false)}
                  className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Close Preview
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
