// Alumni/PostStory.jsx
import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // adjust the path

export default function PostStory() {
  const { darkMode } = useTheme();
  const [story, setStory] = useState("");

  const themeClasses = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const borderClasses = darkMode ? "border-gray-600" : "border-gray-300";
  const hoverClasses = darkMode ? "hover:bg-yellow-400" : "hover:bg-yellow-600";
  const textareaClasses = darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900";

  return (
    <div className={`p-6 rounded-2xl shadow-md border ${themeClasses} ${borderClasses}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaBookOpen className="text-yellow-500" /> Share Story
      </h2>

      <textarea
        rows="5"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Write your inspiring story..."
        className={`p-3 w-full rounded-lg border ${borderClasses} focus:ring-2 focus:ring-yellow-500 outline-none ${textareaClasses}`}
      />

      <button
        className={`mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg transition ${hoverClasses}`}
      >
        Post Story
      </button>
    </div>
  );
}
