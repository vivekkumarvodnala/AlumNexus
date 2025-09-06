// Alumni/PostReview.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // adjust the path

export default function PostReview() {
  const { darkMode } = useTheme();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const themeClasses = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const borderClasses = darkMode ? "border-gray-600" : "border-gray-300";
  const hoverClasses = darkMode ? "hover:bg-indigo-400" : "hover:bg-indigo-600";

  return (
    <div className={`p-6 rounded-2xl shadow-md border ${themeClasses} ${borderClasses}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaStar className="text-indigo-500" /> Write Review
      </h2>

      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <FaStar
            key={num}
            onClick={() => setRating(num)}
            className={`cursor-pointer text-2xl transition ${
              num <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>

      <textarea
        rows="4"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className={`p-3 w-full rounded-lg border ${borderClasses} focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}
      />

      <button
        className={`mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg transition ${hoverClasses}`}
      >
        Submit Review
      </button>
    </div>
  );
}
