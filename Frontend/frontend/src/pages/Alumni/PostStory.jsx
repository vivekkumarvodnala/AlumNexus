// Alumni/PostStory.jsx
import React, { useState } from "react";
import {
  FaBookOpen,
  FaPalette,
  FaFont,
  FaSmile,
  FaCheck,
  FaSearchPlus,
} from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "../../context/ThemeProvider";
import confetti from "canvas-confetti";

export default function PostStory() {
  const { darkMode } = useTheme();
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [gradient, setGradient] = useState(
    darkMode
      ? "from-yellow-400 via-yellow-500 to-yellow-600"
      : "from-teal-600 via-violet-500 to-teal-600"
  );
  const [font, setFont] = useState("font-sans");
  const [fontSize, setFontSize] = useState(28);

  const gradients = darkMode
    ? [
        "from-yellow-400 via-yellow-500 to-yellow-600",
        "from-yellow-300 via-yellow-400 to-yellow-500",
      ]
    : [
        "from-teal-600 via-violet-500 to-teal-600",
        "from-teal-500 via-purple-500 to-teal-500",
      ];

  const fonts = ["font-sans", "font-serif", "font-mono", "italic font-serif", "tracking-widest font-bold"];

  const maxWords = 500;
  const wordCount = story.trim() === "" ? 0 : story.trim().split(/\s+/).length;

  const handleChange = (e) => setStory(e.target.value);
  const addEmoji = (emoji) => {
    setStory((prev) => prev + emoji.native);
    setShowEmoji(false);
  };

  const handleSubmit = async () => {
    if (wordCount === 0 || wordCount > maxWords) return;
    setLoading(true);
    try {
      await axios.post("/api/story", { story, gradient, font, fontSize });
      setStory("");
      setSubmitted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("❌ Error posting story:", err);
    } finally {
      setLoading(false);
    }
  };

  // Theme classes
  const themeBg = darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const iconColor = darkMode ? "text-yellow-400" : "text-teal-600";
  const iconHover = darkMode ? "hover:text-yellow-300" : "hover:text-violet-500";

  return (
    <div className={`min-h-screen w-full flex flex-col px-4 md:px-10 py-6 relative ${themeBg}`}>
      {/* Animated background */}
      <div
        className={`absolute inset-0 -z-10 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-20"
            : "bg-gradient-to-br from-teal-50 via-purple-50 to-white opacity-20"
        } animate-gradient-x`}
      ></div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-3xl md:text-5xl font-extrabold flex items-center gap-3 mb-8 ${iconColor}`}
      >
        <FaBookOpen /> Share Your Story
      </motion.h1>

      {/* Floating Toolbar */}
      <motion.div
        className={`flex flex-wrap justify-between items-center gap-3 mb-6 p-4 rounded-2xl shadow-xl backdrop-blur-xl border ${
          darkMode ? "bg-gray-800/70 border-gray-700" : "bg-white/70 border-gray-300"
        } sticky top-4 z-20`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-3 items-center">
          {/* Emoji */}
          <div className="relative">
            <button
              onClick={() => setShowEmoji((prev) => !prev)}
              className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} ${iconHover} transition`}
            >
              <FaSmile className={iconColor} />
            </button>
            {showEmoji && (
              <div className="absolute z-50 mt-2 shadow-lg">
                <Picker data={data} onEmojiSelect={addEmoji} theme={darkMode ? "dark" : "light"} />
              </div>
            )}
          </div>

          {/* Font */}
          <button
            onClick={() =>
              setFont((prev) => fonts[(fonts.indexOf(prev) + 1) % fonts.length])
            }
            className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} ${iconHover} transition`}
          >
            <FaFont className={iconColor} />
          </button>

          {/* Gradient */}
          <button
            onClick={() =>
              setGradient(
                (prev) => gradients[(gradients.indexOf(prev) + 1) % gradients.length]
              )
            }
            className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} ${iconHover} transition`}
          >
            <FaPalette className={iconColor} />
          </button>

          {/* Font Size */}
          <div className="flex items-center gap-2">
            <FaSearchPlus className={iconColor} />
            <input
              type="range"
              min="18"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-24 accent-teal-600"
            />
          </div>
        </div>

        {/* Preview Toggle */}
        <button
          onClick={() => setPreviewMode((prev) => !prev)}
          className={`px-5 py-2 rounded-full ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
              : "bg-teal-600 hover:bg-violet-500 text-white"
          } font-bold transition`}
        >
          {previewMode ? "✏️ Edit" : "👀 Preview"}
        </button>
      </motion.div>

      {/* Editor / Preview */}
      <motion.div
        className="flex-1 rounded-3xl shadow-lg w-full flex flex-col justify-center items-center overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!previewMode ? (
          <textarea
            rows="12"
            value={story}
            onChange={handleChange}
            placeholder="✨ Write your inspiring story (max 500 words)..."
            className={`w-full p-6 text-lg md:text-xl leading-relaxed outline-none border-none rounded-2xl resize-none ${
              darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        ) : (
          <div
            className={`flex items-center justify-center w-full h-[60vh] text-center px-4 bg-gradient-to-br ${gradient} ${font} text-white rounded-2xl`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {story || "✨ Your story will appear here"}
          </div>
        )}
      </motion.div>

      {/* Bottom Bar */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className={`font-semibold ${wordCount > maxWords ? "text-red-500" : "opacity-80"}`}
        >
          {wordCount}/{maxWords} words
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading || wordCount === 0 || wordCount > maxWords}
          className={`px-8 py-3 rounded-full ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
              : "bg-teal-600 hover:bg-violet-500 text-white"
          } font-bold disabled:opacity-50 flex items-center gap-2 shadow-lg transition`}
        >
          {loading ? "⏳ Posting..." : <><FaCheck /> Post</>}
        </motion.button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-lg font-semibold"
          >
            🎉 Your story has been posted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
